import React, { Component } from 'react';
//import Prompt from 'react-native-prompt';
import difflib from '../helpers/difflib';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  
  codeStyling: {
    paddingTop: 5
  },

  numberStyling: {
    backgroundColor: 'lightgrey',
    height: 25,
    width: 60,
    alignItems: 'center',
    paddingLeft: 6,
    paddingTop: 5
  }
});

export default class SourceDiff extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            promptVisible: false
        };
    }
    render() {
        const CHARACTER_PADDING = 15; 

        const baseTextLines = this.stringAsLines(this.props.baseTextLines);
        const newTextLines = this.stringAsLines(this.props.newTextLines);

        difflib.set_seqs(baseTextLines, newTextLines);
        let codes = difflib.get_opcodes();
        let diff;
        try {
        diff = this.opcodesAsDiff(codes, baseTextLines, newTextLines);
        } catch (err) {
            console.error("opcodesAsDiff: " + err);
        }

        let longestString = 0; 
        let longestRowNumber = 0;

        diff.forEach(d => { 
            if(d.line && d.line.length > longestString) 
                longestString = d.line.length;

            if(d.row && d.row.toString().length > longestRowNumber)
                longestRowNumber = d.row.toString().length;
        });
        longestRowNumber = longestRowNumber * CHARACTER_PADDING;
        longestString = longestString * CHARACTER_PADDING;

        return (
            <View>
                <ScrollView horizontal={true} style={{ padding: 5 }}>
                    <ScrollView horizontal={true}>
                        <FlatList
                        data={diff}
                        renderItem={
                            ({item}) => this.renderLine(item, longestString, longestRowNumber)
                            }
                        />

                    </ScrollView>
                </ScrollView></View>
            );
    }

    renderLine(item, lineWidth, rowWidth) {
            return (
                    <View style={{
                                    flex: 1, 
                                    flexDirection: 'row', 
                                    height: 25, 
                                    alignItems: 'center',
                                    borderBottomColor: '#000', 
                                    borderBottomWidth: .5,
                                    backgroundColor: (item.change == "delete" ? 'salmon' : item.change == "insert" ? 'lightgreen' : '#E0E0E0'),
                                }}>
                        <Text style={styles.numberStyling}>{item.row}</Text>
                        <View style={{ 
                                alignItems: 'center', 
                                height: 25, 
                                borderBottomColor: '#000', 
                                borderBottomWidth: .5
                            }}>
                            <Text style={styles.codeStyling} numberOfLines={1} onPress={() => this.setState({ promptVisible: true })}>{item.line}</Text>
                        </View>
                    </View>
                );
    }

    stringAsLines(text) {
        const lfpos = text.indexOf("\n");
        const crpos = text.indexOf("\r");
        const linebreak = ((lfpos > -1 && crpos > -1) || crpos < 0) ? "\n" : "\r";
        var lines = text.split(linebreak);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/^[\n\r]*|[\n\r]*$/g, "");
        }
        return lines;
    }

    opcodesAsDiff(opcodes, baseTextLines, newTextLines) {
        const CONTEXT_SIZE = 5;
        var rows = [];
        for (var idx = 0; idx < opcodes.length; idx++) {
			let code = opcodes[idx];
			let change = code[0];
			var b = code[1];
			var be = code[2];
			var n = code[3];
			var ne = code[4];
			var rowcnt = Math.max(be - b, ne - n);
			var toprows = [];
			var botrows = [];
			for (var i = 0; i < rowcnt; i++) {
				// jump ahead if we've alredy provided leading context or if this is the first range
				if (CONTEXT_SIZE && opcodes.length > 1 && ((idx > 0 && i == CONTEXT_SIZE) || (idx == 0 && i == 0)) && change=="equal") {
					var jump = rowcnt - ((idx == 0 ? 1 : 2) * CONTEXT_SIZE);
					if (jump > 1) {

						b += jump;
						n += jump;
						i += jump - 1;
						// console.log("th - ...");
						// console.log("th - ...");
						// console.log("td - skip");
						
						// skip last lines if they're all equal
						if (idx + 1 == opcodes.length) {
							break;
						} else {
							continue;
						}
					}
				}
				
                if (change == "insert") {
                    toprows.push(this.inlineRow(null, n++, newTextLines, change, false));
                } else if (change == "replace") {
                    if (b < be) toprows.push(this.inlineRow(b++, null, baseTextLines, "delete", true));
                    if (n < ne) botrows.push(this.inlineRow(n++, n++, newTextLines, "insert", false));
                } else if (change == "delete") {
                    toprows.push(this.inlineRow(b++, null, baseTextLines, change, true));
                } else {
                    // equal
                    toprows.push(this.inlineRow(b++, n++, newTextLines, change, false));
                }
			}

			for (var i = 0; i < toprows.length; i++) rows.push(toprows[i]);
			for (var i = 0; i < botrows.length; i++) rows.push(botrows[i]);
		}

        return rows;
    }

    inlineRow(tidx, tidx2, textLines, change, base) {
        let idx = tidx == null ? null : (tidx + 1).toString();
        const idx2 = tidx2 == null ? null : (tidx2 + 1).toString();

        if (idx == idx2 )
            idx = idx;
        else if(idx2 && !idx)
            idx = idx2;
        else if(!idx2 && idx)
            idx = idx;

        let row = base ? '' : tidx != null ? tidx + 1 : tidx2 + 1;
        return {
            key: idx + change,
            row: row,
            change: change, 
            line: textLines[tidx != null ? tidx : tidx2].replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0"),
            comments: true
        }
    }
};