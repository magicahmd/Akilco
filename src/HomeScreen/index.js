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
import SideBar from "../SideBar/SideBar";
import { DrawerNavigator, StackNavigator } from "react-navigation";



const DrawerRouter = DrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
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




export const HomeScreenRouter = StackNavigator({
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

  HomeScreen: {screen: HomeScreen},

  Dish: {screen: Dish,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' }}
  },
  
}, {
  initialRouteName: "Drawer",
  
});

export default HomeScreenRouter;

