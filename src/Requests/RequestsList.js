import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View, Image, TouchableOpacity, AsyncStorage,Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import URL from '../URLs'

let icons = {
  clean: require('../images/clean.png'),
  call: require('../images/call.png'),
  pay: require('../images/pay.png'),
}




export default class RestaurantsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      id: this.props.navigation.state.params.id,
      user_id: this.props.navigation.state.params.user_id,
      checked: 0,

    }

  }

  getdata() {
    url = URL.getWaiterRequests(this.state.user_id,this.state.id);
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
   
  }

  do_ask(request_id){
    url = URL.do_ask(request_id);
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((responseJson) => {
            
           this.getdata();
        })
        .catch((error) => {
            console.error(error);
        });
  }

  do_request(request_id){
    Alert.alert(
      'Client Request',
      'Have you do it?',
      [
        {text: 'Yes', onPress: () => this.do_ask(request_id)},
        {text: 'No', onPress: () => console.log('No')},
      ],
      { cancelable: false }
    )
  }


  renderButtons() {


    return requests.map((item) => {
      return (

        <ListItem style={styles.listItemContainer} onPress={() => this.do_request(item.id) }>
          <Thumbnail square size={80} source={icons[item.type]} />
          <Body>
            <Text style={{ fontWeight: 'bold' }}>Table NO: {item.table_id}</Text>
            <Text>{item.address}</Text>
          </Body>
        </ListItem>
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

    requests = this.state.data;

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


