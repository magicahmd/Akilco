import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image,AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
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
          restaurant_id: this.props.navigation.state.params.restaurant_id,
          isLoading: true,
          
        }
        
      }

      getdata() {
        url = URL.getDishesList(this.state.id);
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
    
        this.getdata();

        AsyncStorage.getItem('USER', (err, result) => {
          result = JSON.parse(result)
          if(result==null){
          }
          else{
            this.setState({
              userId: result.userId,
              userName: result.userName,
              iSManager: result.iSManager,
              isWaiter: result.isWaiter,
              resId: result.resId,
              islogged:true,
            })
          }
        });

      }

      renderDishes() {
    
 
        return Dishes.map((item) => {
            return (
              
                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("Dish",{id:item.id,name:item.name,user_id:this.state.userId,restaurant_id:this.state.restaurant_id,dish_discription:item.discription})}>
                    <Thumbnail square size={80} source={require('../images/Dinner-Icon.png')} />
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
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


