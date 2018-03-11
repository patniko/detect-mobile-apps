import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/listStore';
import { TeamsStore } from '../stores/teamsStore';
import { Repositories } from './repositories';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class TeamsProps {
    projectName: string;
    navigation: any;
}

@observer
export class Teams extends Component<TeamsProps, {}> {

    private store: TeamsStore;
    @observable skipped: boolean;

    constructor(props) {
        super(props);
        this.store = new TeamsStore();
    }

    componentDidMount() {
        const { projectName } = this.props.navigation.state.params;
        this.store.fetchTeams(projectName);
    }

    render() {
        const { projectName } = this.props.navigation.state.params;
        return (
        <View style={styles.container}>
            <SearchList
                store={this.store}
                hasSearch={false}
                renderRow={(rowData) => <ListRow title={rowData.item.name} onRowPressed={(teamName, rowData) => this.onTeamSelected(teamName)} />}
            />
            <Button title="Don't Select Team" onPress={() => this.onTeamSelected()} />
            </View>
            );
    }

    private onTeamSelected(teamName?: string) {
        const { projectName } = this.props.navigation.state.params;
        this.props.navigation.navigate('Repositories', { projectName: projectName, teamName: teamName });
    }
}
