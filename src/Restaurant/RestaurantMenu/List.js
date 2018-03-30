import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,Alert
} from 'react-native';
import {Button} from 'native-base';
import {StackNavigator} from 'react-navigation'
import {ExpandableList} from "../../../Components/ExpandableList";
import HomeScreen from '../../HomeScreen/HomeScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export const MenuRouter = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);


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
            <MaterialIcons name="expand-more" size={24}/> : 
            <MaterialIcons name="expand-less" size={24}/>}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _renderGroupListItem({item, groupId, rowId}) {
    return (
      <View style={styles.listItemContainer} >
       <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
        <Text style={styles.listItemText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    <Button onPress={() => navigation.navigate("HomeScreen")}>
<Text style={styles.listItemText}>Teeeest</Text>
</Button>

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
    height: 40,
    backgroundColor:'white',
    borderBottomWidth: 0.3,
    borderBottomColor: '#DDD',
    justifyContent:'center',
    
  },
  listItemText: {
    marginLeft: 12,
    color: 'black'
  }
});