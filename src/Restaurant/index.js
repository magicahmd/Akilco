import React, { Component } from "react";
import { TabNavigator } from "react-navigation";

import RestaurantMenu from "./RestaurantProfile"
import RestaurantInfo from "./RestaurantInfo"
import RestaurantOrders from "./restaurantOrders"
import RestaurantTables from "./RestaurantTables"
import PreOrder from "../Order/PreOreder"
import {Localimage} from "../../Components/Localimage"


import {Button,Text,Icon,Item,Footer,FooterTab,Label} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default (MainScreenNavigator = TabNavigator(
    {
      RestaurantMenu: { screen: props => <RestaurantMenu {...props} /> },
      RestaurantInfo: { screen: props => <RestaurantInfo {...props} /> },
      RestaurantOrders: { screen: props => <RestaurantOrders {...props} /> },
      PreOrder: { screen: props => <PreOrder {...props} /> }
    },
    {
      tabBarPosition: "bottom",
      tabBarComponent: props => {
        return (
          <Footer>
            <FooterTab>
              <Button
                vertical
                active={props.navigationState.index === 0}
                onPress={() => props.navigation.navigate("RestaurantMenu")}
              >
                <MaterialIcons name="restaurant-menu" size={24}/>
                <Text>Menu</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 1}
                onPress={() => props.navigation.navigate("RestaurantInfo")}
              >
                <MaterialIcons name="location-on" size={24}/>
                <Text>About</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 2}
                onPress={() => props.navigation.navigate("RestaurantOrders")}
              >
                <MaterialIcons name="playlist-add-check" size={24}/>
                <Text>Orders</Text>
              </Button>
              <Button
                vertical
                active={props.navigationState.index === 3}
                onPress={() => props.navigation.navigate("PreOrder")}
              >
                <MaterialIcons name="shopping-cart" size={24}/>
                <Text>Tables</Text>
              </Button>
            </FooterTab>
          </Footer>
        );
      }
    }
  ));