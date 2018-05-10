import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon,Footer,Title } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import URL from '../URLs'

let images = {
    background: require('../images/background2.jpg'),
  }


export default class DishesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          id: this.props.navigation.state.params.id,
          user_id: this.props.navigation.state.params.user_id,
          isLoading: true,
          total_price: 0
          
        }
        
      }

      getdata() {
        url = URL.getPreorderList(this.state.user_id, this.state.id);
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
          this.getdata()
            }

      renderDishes() {
    
 
        return Dishes.map((item) => {
            this.state.total_price=  this.state.total_price + (item.quantity*item.dish_price);
            
            return (
              
                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("EditPreOrder",{id:item.id})}>
                    <Thumbnail square size={80} source={require('../images/Dinner-Icon.png')} />
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>{item.dish_name}</Text>
                      <Text>Size: {item.dish_size}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>Price: ₪ {item.dish_price}</Text>
                      <Text>Total price: ₪ {item.quantity*item.dish_price}</Text>

                    </Body>
                  </ListItem>
            );
        });
    }

renderFooter(){
    if(this.state.total_price>0)
    return(
        <Footer>
                    <Left style={{marginLeft:15}}>
                        <Text>Total Price:  </Text>
                        <Text>₪ {this.state.total_price} </Text>
                        
                        </Left>
                        <Body/>
                        <Right style={{marginRight:10}}>
                        <Button
                    warning
                    style={{ justifyContent: 'center', width: 180, marginBottom: 4, marginTop: 4  }}
                    onPress={() => this.props.navigation.navigate("")}>
                    <Text style={{color:'white'}}>Send Order</Text>
                  </Button>
                  </Right>
                </Footer>
    );
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

          {this.renderFooter()}

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


