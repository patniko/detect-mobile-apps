import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View, FlatList } from 'react-native';
import AccountManager from '../helpers/accountManager';
import { IAccount } from '../models/IAccount';
import { CreateAccount } from '../components/createAccount';
import { ListRow } from './listRow';
import Projects from '../components/projects';
import styles from '../styles/accountsStyles';
import { find } from 'lodash';

class AccountState {
  accounts: IAccount[];
  modalVisible: boolean;
}

export default class Accounts extends Component<any, AccountState> {

  constructor(props) {
    super(props);
    this.state = { accounts: [], modalVisible: false };
    const token = AccountManager.readAccounts()
      .then((values: IAccount[]) => {
        this.setState({ accounts: values } as AccountState);
      });
    ;
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.accounts && this.state.accounts.length > 0 ? this.renderList() : this.renderEmptyText()}
        <CreateAccount modalVisible={this.state.modalVisible} onAccountSaved={this.onAccountSaved.bind(this)} onAccountCanceled={this.onAccountCanceled.bind(this)} />
      
        <Button title="Add Account" onPress={() => (this.setState({ modalVisible: true }))} />
      </View>
    );
  }

  renderList(): JSX.Element {
    return (
      <View style={styles.listcontainer}>
        <FlatList
          keyExtractor={item => item.name}
          style={styles.list}
          data={this.state.accounts}
          renderItem={({ item }) => <ListRow title={item.name} onRowPressed={(item) => this.onAccountSelected(item)} />}
        />
      </View>
    );
  }

  renderEmptyText(): JSX.Element {
    const emptyText = 'Tap the "Add" button in order to create a new account.';
    return (
      <View>
        <Text style={styles.emptyText}>{emptyText}</Text>
        <Button title="Add" onPress={() => this.setState({ modalVisible: true })} />
      </View>
    );
  }

  onRightButtonPress() {
    this.setState({ modalVisible: true } as AccountState);
  }

  async onAccountSaved(account: IAccount): Promise<void> {
    await AccountManager.saveAccount(account)
    const accounts = await AccountManager.readAccounts()
    this.setState({ accounts: accounts, modalVisible: false });
  }

  onAccountCanceled(): void {
    this.setState({ modalVisible: false });
  }

  onAccountSelected(accountName: string): void {
    const account: IAccount = find(this.state.accounts, (item) => { return item.name === accountName; });
    AccountManager.setCurrentAccount(account)

    this.props.navigation.navigate('Projects', { title: account.name });
  }
}