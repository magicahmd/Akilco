import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {List} from "./List";
import {Constants} from "./Constants";
import {StackNavigator} from 'react-navigation';
import HomeScreen from '../../HomeScreen/HomeScreen'

const MenuRouter = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
  },
  {
  }
);

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
  }

  render() {
    return (
      <View style={styles.pageContainer}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
        <Text style={styles.listItemText}>Teeeest</Text>
        </TouchableOpacity>
        <List data={this.data}/>
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