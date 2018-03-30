import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {List} from "./List";
import {Constants} from "./Constants";
import HomeScreen from '../src/HomeScreen/HomeScreen'
import {StackNavigator} from 'react-navigation';


const MenuRouter = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
  },
  {
    initialRouteName:'HomeScreen',
  }
);

export default MenuRouter;