import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Switch, StyleSheet } from 'react-native';

class ListRowProps {
  title: string;
  data?: any;
  onRowPressed?: (row: string, rowData?) => (void);
  onLongPressed?: (row: string, rowData?) => (void);
  onValueChanged?: (row: string, rowData?) => (void);
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  itemContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 8,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});

export class ListRow extends Component<ListRowProps, {}> {

  render() {
    return (
        <TouchableHighlight onLongPress={() => this.onLongPressed()} style={styles.container} onPress={() => this.onRowPressed()} underlayColor="white">
          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <Text>{this.props.title}</Text>
            </View>
            {
              (this.props.onValueChanged) ?
                <View style={styles.item}>
                  <Switch onValueChange={() => this.onValueChanged()} />
                </View>
              : null
            }
          </View>
        </TouchableHighlight>
    );
  }

  private onRowPressed() {
    if(this.props.onRowPressed) {
      this.props.onRowPressed(this.props.title, this.props.data);
    }
  }

  private onLongPressed() {
    if(this.props.onLongPressed) {
      this.props.onLongPressed(this.props.title, this.props.data);
    }
  }

  private onValueChanged() {
    if(this.props.onValueChanged) {
      this.props.onValueChanged(this.props.title, this.props.data);
    }
  }
}
