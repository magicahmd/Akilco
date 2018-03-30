import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class RestaurantMenu extends Component {

  constructor(props) {
    super(props);
  }

  _renderGroupHeader({item, groupId, status, toggleStatus}) {
    return (
      <View style={styles.headContainer}>
        <Text style={[styles.headTitleText, status && styles.headChosenTitleText]}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleStatus(false)}>
          <View style={styles.touchArea}>
            <Text style={{color: status ? '#333' : '#333'}}>{status ? 'close' : 'open'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderGroupListItem({item, groupId, rowId}) {
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemText}>{item}</Text>
      </View>
    );
  }

  render() {

    const {data = []} = this.props;

    return (
        <Text>the menu</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopColor: '#DDD',
    borderTopWidth: 1
  },
  groupItem: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1
  },
  headContainer: {
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headChosenContainer: {
    backgroundColor: '#CF5942'
  },
  headTitleText: {
    flex: 1,
    color: '#333',
    fontWeight: 'bold'
  },
  headChosenTitleText: {
    color: 'black'
  },
  touchArea: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#DDD'
  },
  listItemText: {
    color: 'black'
  }
});