import { observable, computed, action } from 'mobx'
import { SearchListStore } from './searchListStore';
import AccountManager from '../helpers/accountManager';
import { IPullRequest } from '../models/IPullRequest';
var base64 = require('base-64');

export enum LoadingState {
  Loading = 1,
  Failed,
  Loaded,
}

export class PullRequestStore {

  projectName: string;
  teamName: string;
  repositoryName: string;
  pullRequestId: number;

  @observable data: IPullRequest;
  @observable loadingState: LoadingState;

  constructor() {
    this.loadingState = LoadingState.Loaded;
  }

  @action
  async fetchPullRequest(projectName: string, teamName: string, repositoryName: string, pullRequestId: number) {
    this.projectName = projectName;
    this.teamName = teamName;
    this.repositoryName = repositoryName;
    this.pullRequestId = pullRequestId;
    this.loadingState = LoadingState.Loading;
    try {
      const response = await fetch(this.getPath(), {
        headers: this.getHeaders(),
        method: 'GET'
      });
      this.data = await response.json();
      this.loadingState = LoadingState.Loaded;
    } catch (err) {
      this.loadingState = LoadingState.Failed;
      console.log(`Failed to fetch data: ${err}`);
    }
  }

  private getHeaders(): any {
    var accountToken = AccountManager.getCurrentAccount().token;
    var base64Token = base64.encode(`:${accountToken}`);

    return {
      Authorization: `Basic ${base64Token}`,
      Accept: 'application/json'
    }
  }

  getPath(): string {
    let url = ""
    url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
    url += `/${this.projectName}`;
    url += this.teamName ? `/${this.teamName}` : "";
    url += `/_apis/git/repositories/${this.repositoryName}`
    url += `/pullRequests/${this.pullRequestId}`
    url += "?api-version=1.0"
    return url;
  }
}