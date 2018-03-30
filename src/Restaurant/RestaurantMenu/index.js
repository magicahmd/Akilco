import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {MenuList} from "./List";
import {Constants} from "./Constants";
import {StackNavigator} from 'react-navigation';
import HomeScreen from '../../HomeScreen/HomeScreen'
 
// this code didn't used anywhere in the code // delete it

export class RestaurantMenu extends Component {

  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
    this.data = [
      {
        groupHeaderData: {title: 'وجبات رئيسية'},
        groupListData: ['مقلوبة', 'أوزي', 'Map']
      },
      {
        groupHeaderData: {title: 'مقبّلات'},
        groupListData: ['User', 'Add contact', 'Calendar']
      },
      {
        groupHeaderData: {title: 'مشروبات باردة'},
        groupListData: ['Inbox', 'Sent', 'Deleted']
      },
      {
        groupHeaderData: {title: 'مشروبات ساخنة'},
        groupListData: ['Fill Beer', 'Adjust', 'Alarm']
      }
    ]

    this.toDish = this.props.navigation;
  }

  render() {
    return (
      <View style={styles.pageContainer}>
      <Text onPress={() => this.toDish.navigate("HomeScreen")}>try frmo index</Text>
        <MenuList data={this.data} toDish={this.toDish}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: Constants.IS_IOS ? 20 : 0,
    height: Constants.DEVICE_HEIGHT - (Constants.IS_IOS ? 20 : 0)
  }
});