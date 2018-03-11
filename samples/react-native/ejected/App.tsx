import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Teams from './app/components/teams';
import { Tabs } from './config/router';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  NavigatorIOS,
  Platform,
  StatusBar
} from 'react-native';

export default class App extends React.Component<any, any> {
  private pushedComponent: any;

  render() {
    return (
      <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, flex: 1, flexDirection: 'column', justifyContent: 'center', alignSelf: 'stretch' }}>
        <Tabs />
      </View>
    );
  }
}
