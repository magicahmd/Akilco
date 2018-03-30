import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {ExpandableList} from "../Components/ExpandableList";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export class List extends PureComponent {

  constructor(props) {
    super(props);
  }

  _renderGroupHeader({item, groupId, status, toggleStatus}) {
    return (
      <View style={styles.headContainer}>
        <Text style={[styles.headTitleText, status && styles.headChosenTitleText]}>{item.title}</Text>
        <TouchableOpacity onPress={() => toggleStatus(false)}>
          <View style={styles.touchArea}>
            <Text style={{color: status ? '#333' : '#333'}}>{status ? 
            <MaterialIcons name="expand-more" size={24}></MaterialIcons> : 
            <MaterialIcons name="expand-less" size={24}></MaterialIcons>}</Text>
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
      <View style={styles.container}>
        <ExpandableList
          data={data}
          groupStyle={styles.groupItem}
          renderGroupHeader={this._renderGroupHeader}
          renderGroupListItem={this._renderGroupListItem}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  groupItem: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1
  },
  headContainer: {
    paddingHorizontal: 15,
    height: 35,
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
    fontWeight: 'bold',
    alignItems: 'flex-end'

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
    height: 30,
    backgroundColor:'white',
    borderBottomWidth: 0.3,
    borderBottomColor: '#DDD'
  },
  listItemText: {
    alignItems: 'flex-end',
    color: 'black'
  }
});