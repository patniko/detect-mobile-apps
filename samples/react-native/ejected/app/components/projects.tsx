import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { Teams } from './teams';
import { LoadingState } from '../stores/listStore';
import { ProjectsStore } from '../stores/projectsStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

@observer
export default class Projects extends Component<any, {}> {

  private store: ProjectsStore;

  constructor(props) {
    super(props);
    this.store = new ProjectsStore();
  }

  componentDidMount() {
    this.store.fetchData();
  }

  render() {
      return (<SearchList
        store={this.store}
        hasSearch={true}
        renderRow={(rowData => <ListRow title={rowData.item.name} onRowPressed={(projectName) => this.onProjectSelected(projectName)} />)}
      />);
  }

  private onProjectSelected(projectName: string) {
    this.props.navigation.navigate('Repositories', { projectName: projectName });
  }
}
