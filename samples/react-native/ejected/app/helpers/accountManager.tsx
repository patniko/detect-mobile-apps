import { IAccount } from '../models/IAccount';
import store from 'react-native-simple-store';

const STORAGE_KEY: string = "ACCOUNTS";

class AccountManager {

  currentAccount: IAccount;

  async readAccounts(): Promise<IAccount[]> {
    try {
      const value = await store.get(STORAGE_KEY)
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(`AccountManager: Couldn't read accounts: ${error}`);
    }
  }

  async saveAccount(account: IAccount): Promise<void> {
    try {
      await store.push(STORAGE_KEY, account)
    } catch (error) {
      console.log(`TokenManager: Couldn't save token: ${error}`);
    }
  }

  getCurrentAccount(): IAccount {
    return this.currentAccount;
  }

  setCurrentAccount(account: IAccount): void {
    this.currentAccount = account;
  }

  resetCurrentAccount(): void {
    this.currentAccount = undefined;
  }
}

export default new AccountManager()