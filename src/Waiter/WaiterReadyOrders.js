import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon,Footer,Title } from 'native-base';
import {DeviceEventEmitter} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import URL from '../URLs'

let images = {
    background: require('../images/background2.jpg'),
  }


export default class WaiterReadyOrders extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          id: this.props.navigation.state.params.id,
          user_id: this.props.navigation.state.params.user_id,
          isLoading: true,          
        }
        
      }

      getdata() {
        url = URL.getWaiterReadyOrders(this.state.user_id, this.state.id);
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ data: responseJson , isLoading: false});
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      componentWillMount() {
        DeviceEventEmitter.addListener('refreshWaiterReadyOrders', (e)=>{this.getdata()});
          this.getdata();
            }

      renderDishes() {
    
 
        return Orders.map((item) => {
            this.state.total_price=  this.state.total_price + (item.quantity*item.dish_price);
            
            return (
              
                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("OrderInfo",{id:item.id,status:'Ready'})}>
                    <Thumbnail square size={80} source={require('../images/MenuLogo.png')} />
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>order id: {item.id}</Text>
                      <Text note>Table No: {item.table_id}</Text>
                    </Body>
                  </ListItem>
            );
        });
    }



  render() {

    if(this.state.isLoading){
        return(
            <Container>
        <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>
        
          <Content>
          <Image source={require('../images/loading-icon.gif')} style={{alignSelf:'center', marginTop:12, marginBottom:8}}/>
         
          </Content>
        </ImageBackground>
      </Container>

        )
    }

    Orders = this.state.data;

    return (
      <Container>
        <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>
        
          <Content>
          <View style={{ backgroundColor: 'white' }}>          
          
            <List >
              
            {this.renderDishes()}

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


