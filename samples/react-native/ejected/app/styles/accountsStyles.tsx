import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: 'gray',
    fontSize: 20,
    padding: 40,
    textAlign: 'center'
  },
  listcontainer: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  list: {
    flex: 1
  },
});