import React, { Component } from "react";
import HomeScreen from './HomeScreen';
import MainScreenNavigator from "../ChatScreen/index";
import ProfileScreen from "../ProfileScreen/index";
import RestaurantsList from "../RestaurantsList/RestaurantList"
import RestaurantProfile from "../Restaurant/index" //edit it
import RestaurantInfo from "../Restaurant/RestaurantInfo"
import Login from "../Login/Login"
import Signup from "../Login/Signup"
import Dish from "../Dish/Dish";
import DishesList from "../Dish/DishesList";
import SideBar from "../SideBar/SideBar";
import {RestaurantMenu} from '../Restaurant/RestaurantMenu/index'
import {ExpandableList} from "../../Components/ExpandableList";
import {MenuList} from '../Restaurant/RestaurantMenu/List'
import ReserveTable from '../Tables/ReserveTable'
import SitOnTable from '../Tables/SitOnTable'
import TablesList from '../Tables/TablesList'


import { DrawerNavigator, StackNavigator } from "react-navigation";
import { Tab } from "native-base";



const DrawerRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    ProfileScreen: { screen: ProfileScreen },

  },
  {
    drawerPosition: 'right',
    contentComponent: props => <SideBar {...props} />
  }
);

const HomeButtons = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    RestaurantsList: { screen: RestaurantsList },
  },
  {
  }
);


const HomeScreenRouter = StackNavigator({
  Drawer: {
    screen: DrawerRouter,
    navigationOptions: {
      headerMode:'none',
       headerTintColor: 'white',
       headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },

  RestaurantsList: { screen: RestaurantsList, },

  Login: { screen: Login, 
    navigationOptions: {
      title: 'Log in',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
    
    },

    Signup: { screen: Signup,
 
      navigationOptions: {
        title: 'Sign up',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
      
      },

  RestaurantProfile: 
  {  screen: RestaurantProfile,
    
     navigationOptions: {
       headerTintColor: 'white',
       headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },
  
  RestaurantMenu: {screen:RestaurantMenu},
  ExpandableList: {screen:ExpandableList},
  MenuList: {screen:MenuList},
  HomeScreen: {screen: HomeScreen},

  ReserveTable: {screen: ReserveTable,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },

  SitOnTable: {screen: SitOnTable,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },

  TablesList: {screen: TablesList,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },

  Dish: {screen: Dish,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },

  DishesList: {screen: DishesList,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },


  
}, {
  initialRouteName: "Drawer",
  
});

export default HomeScreenRouter;

