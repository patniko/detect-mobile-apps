import {
    ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';

export class RepositoriesStore extends SearchListStore {
    projectName: string;
    teamName: string;

    @action
    async fetchRepositories(projectName: string, teamName: string) {
        this.projectName = projectName;
        this.teamName = teamName;
        return super.fetchData();
    }

    filterItems(): any[] {
        const filterString = this.filterTerm ? this.filterTerm.toLowerCase() : "";
        return filter(this.items, (item) => { return startsWith(item.name.toLowerCase(), filterString); });
    }

    transformData(data: any): any[] {
        return map(data.value, (item) => { return { id: item.id, name: item.name } }).sort((a, b) => { return a.name > b.name; });
    }
g
    getPath(): string {
        let url = ""
        url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
        url += `/${this.projectName}`;
        //url += this.teamName ? `/${this.teamName}` : "";
        url += `/_apis/git/repositories`
        url += "?api-version=1.0"
        return url;

    }
}