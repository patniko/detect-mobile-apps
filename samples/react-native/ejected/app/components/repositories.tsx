import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { PullRequests } from './pullRequests';
import { LoadingState } from '../stores/listStore';
import { RepositoriesStore } from '../stores/repositoriesStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class RepositoriesProps {
    projectName: string;
    teamName?: string;
    navigation: any;
}

@observer
export class Repositories extends Component<RepositoriesProps, {}> {

    private store: RepositoriesStore;
    @observable selectedRepositoryName: string;

    constructor(props) {
        super(props);
        this.store = new RepositoriesStore();
    }

    componentDidMount() {
        const { projectName, teamName } = this.props.navigation.state.params;
        this.store.fetchRepositories(projectName, teamName);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded && this.selectedRepositoryName) {
            return (<View />)
        } else {
            return (<SearchList
                store={this.store}
                hasSearch={false}
                renderRow={(rowData) => <ListRow title={rowData.item.name} onRowPressed={(repositoryName) => this.onRepositorySelected(repositoryName)} />}
            />);
        }
    }

    private onRepositorySelected(repositoryName: string) {
        const { projectName, teamName } = this.props.navigation.state.params;
        this.props.navigation.navigate('PullRequests', { projectName: projectName, teamName: teamName, repositoryName: repositoryName });
    }
}
