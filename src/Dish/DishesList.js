import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

let images = {
    background: require('../images/background2.jpg'),
  }


export default class DishesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          id: this.props.navigation.state.params.id,
          isLoading: true,
          
        }
        
      }

      getdata() {
        return fetch('http://10.0.0.7/Server/public/api/menuDishes/'+this.state.id)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ data: responseJson , isLoading: false});
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      componentWillMount() {
    
        this.getdata();
      }

      renderDishes() {
    
 
        return Dishes.map((item) => {
            return (
              
                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("Dish",{id:item.id})}>
                    <Thumbnail square size={80} source={require('../images/MenuLogo.png')} />
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>{item.dishName}</Text>
                      <Text note style={{ color: 'green' }}>{item.dishPrice}</Text>
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

    Dishes = this.state.data;

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


