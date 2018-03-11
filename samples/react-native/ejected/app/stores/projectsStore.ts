import { observable, computed } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';
import AccountManager from '../helpers/accountManager';

export class ProjectsStore extends SearchListStore {

  filterItems(): any[] {
    const filterString = this.filterTerm ? this.filterTerm.toLowerCase() : "";
    return filter(this.items, (item) => { return startsWith(item.name.toLowerCase(), filterString); });
  }

  transformData(data: any): any[] {
    const list = map(data.value, (item) => { return { id: item.id, name: item.name } }).sort((a, b) => { return a.name > b.name; });
    return list;
  }

  getPath(): string {
    const account = AccountManager.getCurrentAccount().name;
    return `https://${account}.visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0`;
  }
}