import React, { Component } from 'react';
import Prompt from 'react-native-prompt';
import SourceDiff from './sourceDiff';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    FlatList
} from 'react-native';

var { height } = Dimensions.get('window');

var box_count = 3;
var box_height = height * .10;
var body_height = height * .90;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box: {
        height: box_height
    },
    header: {
        backgroundColor: '#2196F3',
        paddingLeft: 15
    },
    body: {
        backgroundColor: '#8BC34A',
        height: body_height
    }
});

class SourceViewProps {
    baseText: string;
    newText: string;
    title: string;
}

export default class SourceView extends Component<SourceViewProps, {}> {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            promptVisible: false
        };
    }
    render() {
        let baseText = this.props.baseText;
        let newText = this.props.newText;
        let title = this.props.title;
        
        return (
            <View style={{ alignSelf: 'stretch' }}>
                <View style={styles.container}>

                    <Text>{title}</Text>
                    <View style={[styles.box, styles.body]}>
                        <SourceDiff baseTextLines={baseText} newTextLines={newText} />
                    </View>
                </View>
            </View>);
    }
};