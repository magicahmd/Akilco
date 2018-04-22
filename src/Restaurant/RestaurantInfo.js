import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground,View } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MapView from 'react-native-maps'

export default class RestaurantInfo extends React.Component {
  static navigationOptions = {
    title: 'aaaaaaaa',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }


  render() {

    return (
  
            
          <View>
            <MapView/>
            </View>
            




    );
  }
}

const styles = StyleSheet.create({
  map:{
    position: 'absolute'
  }

});
