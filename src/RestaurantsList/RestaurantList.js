import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RestaurantsListData from './RestaurantListData'
import URL from '../URLs'

let logos = {
  1: require('../images/pizza-hut.jpg'),
  2: require('../images/kfc-logo.png'),
}




export default class RestaurantsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      checked: 0,

    }

  }

  getdata() {
    url = URL.getRestaurantsList();
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, isLoading: false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getdata();
    console.log('Hey, This application sucks.')
  }

  static navigationOptions = {
    title: 'Restaurants',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }


  renderButtons() {


    return restaurants.map((item) => {
      return (

        <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("RestaurantProfile", { id: item.id })}>
          <Thumbnail square size={80} source={logos[item.id]} />
          <Body>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.address}</Text>
          </Body>
        </ListItem>
      );
    });
  }

  renderSizes() {


    return restaurants.map((item, key) => {
      return (
        <View>
          {this.state.checked == key ?
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Image style={{ width: 25, height: 25 }} source={require('../images/filledButton.png')} />
              <Text>checked</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this.setState({ checked: key }) }}>
              <Image style={{ width: 25, height: 25 }} source={require('../images/unfilledButton.png')} />
              <Text>unchecked</Text>
            </TouchableOpacity>
          }

        </View>

      );
    });
  }


  render() {

    if (this.state.isLoading) {
      return (
        <Container>
          <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

            <Content>
              <Image source={require('../images/loading-icon.gif')} style={{ alignSelf: 'center', marginTop: 12, marginBottom: 8 }} />

            </Content>
          </ImageBackground>
        </Container>

      )
    }

    restaurants = this.state.data;

    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

          <Content>
            <View style={{ backgroundColor: 'white' }}>


              <List >

                {this.renderButtons()}

              </List>

              {
                //this.renderSizes()
              }
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


