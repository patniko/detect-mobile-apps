import React, { Component } from 'react';
import { Alert, Button, Modal, Platform, NavigatorIOS, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { IAccount } from '../models/IAccount';
import { isEmpty } from 'lodash';
import styles from '../styles/createAccountStyles';

class CreateAccountProps {
  modalVisible: boolean;
  onAccountSaved?: (account: IAccount) => void;
  onAccountCanceled?: () => void;
}

class CreateAccountState {
  accountName: string;
  accessToken: string;
}

export class CreateAccount extends Component<CreateAccountProps, CreateAccountState> {

  constructor(props) {
    super(props);
    this.resetState();
  }

  render() {
    const { modalVisible } = this.props;
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { }}
        >
          {
            (Platform.OS === 'ios') ? 
              (<NavigatorIOS initialRoute={{
                component: Empty,
                title: 'Create Account',
                rightButtonTitle: 'Save',
                onRightButtonPress: this.onRightButtonPress.bind(this),
                leftButtonTitle: 'Cancel',
                onLeftButtonPress: this.onLeftButtonPress.bind(this)
              }}
              style={{ height: 65 }} />) : null
          }

          <View style={styles.container}>
            <View style={styles.inputGroupContainer}>
              <Text style={styles.label}>Account Name</Text>
              <TextInput style={styles.input} onChangeText={(text) => this.setState({ accountName: text })} value={this.state.accountName} />
            </View>
            <View style={styles.inputGroupContainer}>
              <Text style={styles.label}>Access Token</Text>
              <TextInput style={styles.input} onChangeText={(text) => this.setState({ accessToken: text })} value={this.state.accessToken} />
            </View>

            {(Platform.OS !== 'ios') ? (
            <View>
              <Button title="Save" onPress={this.onRightButtonPress.bind(this)} />
              <Button title="Cancel" onPress={this.onLeftButtonPress.bind(this)} />
            </View>
          ) : null }
          </View>
        </Modal>
      </View>
    );
  }

  onRightButtonPress(): void {
    if (isEmpty(this.state.accessToken) || isEmpty(this.state.accountName)) {
      Alert.alert(
        'Creating account failed',
        'Please fill in a account name and access token.',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      )
    } else {
      const { onAccountSaved } = this.props;
      if (onAccountSaved) {
        onAccountSaved({
          name: this.state.accountName,
          token: this.state.accessToken
        })
      }
      this.resetState();
    }
  }

  onLeftButtonPress(): void {
    const { onAccountCanceled } = this.props;
    if (onAccountCanceled) {
      onAccountCanceled()
      this.resetState();
    }
  }

  resetState(): void {
    this.state = {
      accountName: '',
      accessToken: ''
    };
  }
}

class Empty extends Component {

  render() {
    return (
      <View />
    );
  }
}