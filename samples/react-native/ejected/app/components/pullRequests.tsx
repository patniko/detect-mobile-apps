import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { PullRequest } from './pullRequest';
import { LoadingState } from '../stores/listStore';
import { PullRequestsStore } from '../stores/pullRequestsStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class PullRequestsProps {
    projectName: string;
    teamName?: string;
    repositoryName: string;
    navigation: any;
}

@observer
export class PullRequests extends Component<PullRequestsProps, {}> {

    private store: PullRequestsStore;

    constructor(props) {
        super(props);
        this.store = new PullRequestsStore();
    }

    componentDidMount() {
        const { projectName, teamName, repositoryName } = this.props.navigation.state.params;
        this.store.fetchPullRequests(projectName, teamName, repositoryName);
    }

    render() {
        return (<SearchList
            store={this.store}
            hasSearch={false}
            renderRow={(rowData) => <ListRow title={rowData.item.name} data={rowData} onRowPressed={(pullRequestName, rowData) => this.onPullRequestSelected(pullRequestName, rowData)} />}
        />);
    }

    private onPullRequestSelected(pullRequestName: string, rowData) {
        const { projectName, teamName, repositoryName } = this.props.navigation.state.params;
        this.props.navigation.navigate('PullRequest', { projectName: projectName, repositoryName: repositoryName, latestCommitId: rowData.item.lastCommitId});    
    }
}
