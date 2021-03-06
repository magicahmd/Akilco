import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

 let logos = {
  pizzaHut: require('../images/pizza-hut.jpg'),
  kfc:  require('../images/kfc-logo.png'),
}

import URL from '../URLs'


export default class TablesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: this.props.navigation.state.params.id,
      isLoading: true,
      
    }
    
  }

  getdata() {
    url = URL.getRestaurantTables(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, isLoading:false });
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getdata();
  }

  static navigationOptions = {
    title: 'Restaurants',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }


  renderButtons() {
    
 
    return restaurants.map((item) => {
        return (
          
            <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("ReserveTable",{id:item.id})}>
                <Thumbnail square size={80} source={require('../images/table-icon.png')} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>Table No: {item.name}</Text>
                  <Text note style={{ color: 'green' }}>Seats No: {item.seats_no}</Text>
                </Body>
              </ListItem>
        );
    });
}


  render() {
    
    if(this.state.isLoading){
      return(
          <Container>
      <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>
      
        <Content>
        <Image source={require('../images/loading-icon.gif')} style={{alignSelf:'center', marginTop:12, marginBottom:8}}/>
       
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


