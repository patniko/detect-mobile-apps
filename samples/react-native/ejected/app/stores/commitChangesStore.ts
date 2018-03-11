import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { IPullRequestChange } from '../models/IPullRequestChange';
import AccountManager from '../helpers/accountManager';
var base64 = require('base-64');

export enum LoadingState {
    Loading = 1,
    Failed,
    Loaded,
}

export class CommitChangesStore {
    private _projectName;
    private _repositoryName;
    private _commitId;

    public items: any[];
    @observable filteredItems: any[];
    @observable loadingState = LoadingState.Loading;

    @action
    public async fetchPullRequestChanges(projectName, repositoryName, commitId) {

        this._projectName = projectName;
        this._repositoryName = repositoryName;
        this._commitId = commitId;
        return this.fetchData();
    }

    async getItems(): Promise<any[]> {
        let items: IPullRequestChange[] = [];
        const json = await this.getJson(this.getChangesPath());
        let fileChangesList = this.transformCommitChangesData(json);
        let promises = [];

        for (let commitFiles of fileChangesList) {
            try {
                await this.fetchBlobs(commitFiles, items);
            } catch (err) {
                console.log("fetchBlobs" + err);
            }
            
        }
        
        await Promise.all(promises);
        return items;
    }

    @action
    async fetchData(): Promise<void> {
        try {
            this.loadingState = LoadingState.Loading;
            this.items = await this.getItems();
            this.loadingState = LoadingState.Loaded;
        } catch (err) {
            this.loadingState = LoadingState.Failed;
            console.log(`Failed to fetch items: ${err}`);
        }
    }

    async fetchBlobs(commitFiles, items: any[]): Promise<void> {
        const baseFile = commitFiles.originalObjectId ? await this.fetchBlob(commitFiles.originalObjectId) : ""; // added
        const sourceFile = commitFiles.objectId ? await this.fetchBlob(commitFiles.objectId) : ""; // deleted
        items.push({
            path: commitFiles.path,
            baseFile: baseFile,
            sourceFile: sourceFile,
            changeType: commitFiles.changeType
        } as IPullRequestChange);
    }

    private async fetchBlob(blobId: string): Promise<any> {
        try {
            const body = await this.getBody(this.getBlobPath(blobId));
            return body;
        } catch (err) {
            console.log(err);
        }
    }

    transformCommitChangesData(data) {
        let filesList = filter(data.changes, (change) => !change.item.isFolder);
        return map(filesList, (fileChange) => {
            return {
                objectId: fileChange.item.objectId,
                originalObjectId: fileChange.item.originalObjectId,
                path: fileChange.item.path,
                isFolder: fileChange.item.isFolder,
                changeType: fileChange.changeType
            };
        });
    }
    getChangesPath() {
        let url = "";
        url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
        url += `/${this._projectName}`;
        url += `/_apis/git/repositories/${this._repositoryName}`;
        url += `/commits/${this._commitId}`;
        url += `/changes`;
        url += "?api-version=1.0";
        return url;
    }

    getBlobPath(objectId: string) {
        let url = "";
        url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
        url += `/${this._projectName}`;
        url += `/_apis/git/repositories/${this._repositoryName}`;
        url += `/blobs/${objectId}`;
        url += "?api-version=1.0&$format=text";
        return url;

        // GET /blobs/{objectId}?api-version={version}[&download={bool}&fileName={string}]
        // https: /items/api % 2;
        // Fswagger % 2;
        // Fswagger.yaml ? versionType = Commit & version :  = 12;
        // d71cdb81a15ef31c1106698fc201096aa05448;
    }

    public async getJson(path: string) {
        const response = await fetch(path, {
            headers: this.getHeaders(),
            method: 'GET'
        });
        const json = await response.json();
        return json;
    }

    public async getBody(path: string) {
        const response = await fetch(path, {
            headers: this.getHeaders(),
            method: 'GET'
        });
        const body = await response.text();
        return body;
    }

    private getHeaders(): any {
        var accountToken = AccountManager.getCurrentAccount().token;
        var base64Token = base64.encode(`:${accountToken}`);

        return {
            Authorization: `Basic ${base64Token}`,
            Accept: 'application/json'
        }
    }
}