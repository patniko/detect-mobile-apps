import React, { Component } from 'react';
import { View, SectionList, Text } from 'react-native';
import { LoadingState } from '../stores/commitChangesStore';
import { PullRequestStore } from '../stores/pullRequestStore';
import { ListRow } from './listRow';
import SourceView from './sourceView';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { IPullRequest } from '../models/IPullRequest';
import { IPullRequestChange } from '../models/IPullRequestChange';
import { CommitChangesStore } from '../stores/commitChangesStore'
import { map } from 'lodash';
import styles from '../styles/pullRequestStyles';

class PullRequestProps {
    projectName: string;
    repositoryName: string;
    latestCommitId: string;
    navigation: any;
}

@observer
export class PullRequest extends Component<PullRequestProps, {}> {
    private store: CommitChangesStore;

    constructor(props) {
        super(props);
        this.store = new CommitChangesStore();
    }

    componentDidMount() {
        const { projectName, repositoryName, latestCommitId } = this.props.navigation.state.params;
        this.store.fetchPullRequestChanges(projectName, repositoryName, latestCommitId);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded) {
            const data = this.store.items;
            const sections = map(data, (item) => { return { data: [item], title: item.path } });

            return (<View style={{flexDirection: 'row', flex: 1}}>
             {
                 data.map((item, key) => {
                    return (
                        <SourceView key={key} title={`${item.path} (${item.changeType})`} baseText={item.baseFile} newText={item.sourceFile} />
                    );
                })
            }
            </View >);
        } else {
            return (<View />)
        };
    }
}
