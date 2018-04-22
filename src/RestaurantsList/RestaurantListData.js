import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class RestaurantsListData extends Component {

       
    

    render() {

     

        return (
            
            <View style={{ backgroundColor: 'white' }}>
            
            <List >
              <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("RestaurantProfile")}>
                <Thumbnail square size={80} source={require('../images/pizza-hut.jpg')} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>Pizza Hut</Text>
                  <Text note style={{ color: 'green' }}>مفتوح</Text>
                </Body>
              </ListItem>

            </List>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    listItemContainer: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#DDD'
    },
  
  });