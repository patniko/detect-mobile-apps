import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';
import AccountManager from '../helpers/accountManager';

export class TeamsStore extends SearchListStore {
    projectName: string;

    @action
    async fetchTeams(projectName: string) {
        this.projectName = projectName;
        return super.fetchData();
    }

    filterItems(): any[] {
        const filterString = this.filterTerm ? this.filterTerm.toLowerCase() : "";
        return filter(this.items, (item) => { return startsWith(item.name.toLowerCase(), filterString); });
    }

    transformData(data: any): any[] {
    return map(data.value, (item) => { return {id: item.id, name: item.name}}).sort((a, b) => { return a.name > b.name; });
  }

    getPath(): string {
        const account = AccountManager.getCurrentAccount().name;
        const base = `https://${account}.visualstudio.com/DefaultCollection/_apis/projects`;
        return `${base}/${this.projectName}/teams?api-version=1.0`
    }
}