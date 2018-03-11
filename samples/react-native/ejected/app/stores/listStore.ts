import {
  ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, map } from 'lodash';
import AccountManager from '../helpers/accountManager';

var base64 = require('base-64');

export enum LoadingState {
  Loading = 1,
  Failed,
  Loaded,
}

export abstract class ListStore {
  public items: any[];
  @observable filteredItems: any[];
  @observable loadingState: LoadingState;

  constructor() {
    this.loadingState = LoadingState.Loaded;
    this.filteredItems = [];
  }

  @action
  async fetchData(): Promise<void> {
    try {
      this.loadingState = LoadingState.Loading;
      this.items = await this.getItems();
      if (!this.items) {
        const json = await ListStore.getJson(this.getPath());
        this.items = this.transformData(json);
      }
      this.filteredItems = this.items;
      this.loadingState = LoadingState.Loaded;
    } catch (err) {
      this.loadingState = LoadingState.Failed;
      console.log(`Failed to fetch items: ${err}`);
    }
  }

  public static async getJson(path: string) {
    const response = await fetch(path, {
        headers: ListStore.getHeaders(),
        method: 'GET'
      });
      const json = await response.json();
      return json;
  }

  public static async getBody(path: string) {
    const response = await fetch(path, {
        headers: ListStore.getHeaders(),
        method: 'GET'
      });
      const body = await response.text();
      return body;
  }

  private static getHeaders(): any {
    var accountToken = AccountManager.getCurrentAccount().token;
    var base64Token = base64.encode(`:${accountToken}`);

    return {
      Authorization: `Basic ${base64Token}`,
      Accept: 'application/json'
    }
  }

  /**
   * This method can be overriden to return an array with the items to save in the data source. 
   * This class will still handle all the state machine
   * 
   * @returns {*} 
   * @memberof ListStore
   */
  public async getItems(): Promise<any[]> {
    return null;
  }

  public getPath(): string {
    return null;
  }

  public transformData(date): any[] {
    return null;
  }
}