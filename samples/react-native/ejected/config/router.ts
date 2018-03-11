import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Image, Platform, StatusBar } from 'react-native';

import Accounts from '../app/components/accounts';
import Projects from '../app/components/projects';
import { PullRequests } from '../app/components/pullRequests';
import { PullRequest } from '../app/components/pullRequest';
import { Teams } from '../app/components/teams';
import { Repositories } from '../app/components/repositories';

export const AccountStack = StackNavigator({
  Accounts: {
    screen: Accounts,
    navigationOptions: {
      title: "Accounts",
      tabBarLabel: "Accounts"
    }
  },
  Projects: {
    screen: Projects,
    navigationOptions: {
      title: "Projects",
      tabBarLabel: "Projects"
    }
  },
  Teams: {
    screen: Teams,
    navigationOptions: {
      title: "Teams",
      tabBarLabel: "Teams"
    }
  },
  Repositories: {
    screen: Repositories,
    navigationOptions: {
      title: "Repositories",
      tabBarLabel: "Repositories"
    }
  },
  PullRequests: {
    screen: PullRequests,
    navigationOptions: {
      title: "Pull Requests",
      tabBarLabel: "Pull Requests"
    }
  },
  PullRequest: {
    screen: PullRequest,
    navigationOptions: {
      title: "Review PR",
      tabBarLabel: "Repositories"
    }
  }
});

export const Tabs = TabNavigator({
  Accounts: {
    screen: AccountStack,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Accounts',
      title: `My Accounts`,
    }),
  },
  PR: {
    screen: Accounts,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'PR',
      title: `Pull Requests`,
    }),
  },
  Sprint: {
    screen: Accounts,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Sprint',
      title: `Work Items`,
    }),
  }
}); 

