import React, { Component } from 'react';
import {ImageBackground,StyleSheet,ScrollView, View} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body,Left,Right,Button,Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class RestaurantsList extends Component {

  static navigationOptions = {
    title: 'Restaurants',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    }
  
  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        <Content>
          <View style={{backgroundColor:'white'}}>
          <List >
            <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("RestaurantProfile")}>
              <Thumbnail square size={80} source={require('../images/pizza-hut.jpg')} />
              <Body>
                <Text style={{fontWeight:'bold'}}>Pizza Hut</Text>
                <Text note style={{color:'green'}}>مفتوح</Text>
              </Body>
            </ListItem>
            
          </List>
          </View>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD'
  },
 
});


