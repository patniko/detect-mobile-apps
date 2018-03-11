import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import { ListStore } from './listStore';
import AccountManager from '../helpers/accountManager';

export enum LoadingState {
  Loading = 1,
  Failed,
  Loaded,
}

export abstract class SearchListStore extends ListStore{

  @observable items: any[];
  @observable loadingState: LoadingState;
  @observable filterTerm: string;

  @action
  setFilterTerm(filterTerm: string): void {
    this.filterTerm = filterTerm;
    this.filteredItems = this.filterItems();
  }

  abstract filterItems(): any[];
}