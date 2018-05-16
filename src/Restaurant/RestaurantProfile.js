import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View, AsyncStorage,Alert } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  ListView,
  ScrollView,
  FlatList,
  List, ListItem,
  Thumbnail,
  LayoutAnimation
} from "native-base";

import URL from '../URLs'

let logos = {
  1: require('../images/pizza-hut-image.jpg'),
  2: require('../images/kfc-image.png'),
}


import ExpandableList from './ExpandableList'
import { Constants } from "./Constants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Localimage from '../../Components/Localimage'
//import {RestaurantMenu} from './RestaurantMenu/index'
//import {MenuList} from "./RestaurantMenu/List";




export default class RestaurantProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: this.props.navigation.state.params.id,
      isLoading: false,
      hasTable: false,

    }
  }

  getdata() {
    url = URL.getRestaurantMenu(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson,});
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserData(){
    url = URL.show_user(this.state.userId);
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ user_data: responseJson,
        
         });
      if(this.state.user_data[0].table != null){
        this.setState({hasTable:true,
          table_id: responseJson[0].table.id,
          table_no: responseJson[0].table.name,
          table_restaurant_id: responseJson[0].table.restaurant_id});

      }
      

    })
    .catch((error) => {
      console.error(error);
    });
   
  }

  clean_button(){
    Alert.alert(
      'Calling waiter',
      'do you want to clean your table ?',
      [
        {text: 'Yes', onPress: () => {this.setState({type:'clean'});this.send_ask()}},
        {text: 'No', onPress: () => console.log('No')},
      ],
      { cancelable: false }
    )
  }

  call_button(){
    Alert.alert(
      'Calling waiter',
      'do you want to call the waiter ?',
      [
        {text: 'Yes', onPress: () => {this.setState({type:'call'});this.send_ask()}},
        {text: 'No', onPress: () => console.log('No')},
      ],
      { cancelable: false }
    )
  }

  pay_button(){
    Alert.alert(
      'Calling waiter',
      'do you want to call the waiter ?',
      [
        {text: 'Yes', onPress: () => {this.setState({type:'pay'});this.send_ask()}},
        {text: 'No', onPress: () => console.log('No')},
      ],
      { cancelable: false }
    )
  }

  send_ask(){
    url = URL.send_ask();
    fetch(url, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id: this.state.userId,
          restaurant_id: this.state.id,
          table_id: this.state.table_id,
          type: this.state.type,
          }),
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
        this.getUserData();
        this.setState({isloading: false});
      }
    });

   


  }

  renderMenu() {
    
 
    return Menu.map((item) => {
        return (
          
          <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("DishesList", { id: item.id, restaurant_id:this.state.id })}>
          <Thumbnail square size={60} source={ require('../images/MenuLogo.png')} />
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            </Body>
          </ListItem>
        );
    });
}

renderPreorder(){
  if(this.state.islogged)
  return(
    <Card>
                <CardItem>
                  <Body>
                    
                    <Image source={require('../images/PreOrder.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 4, marginBottom: 8 }} />

                    <Button
                      warning
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 4 }}
                      onPress={() => this.props.navigation.navigate("PreOrder",{id:this.state.id,user_id:this.state.userId,table_id:this.state.table_id})}
                    >
                      <Text>My Pre-Orders</Text>
                    </Button>

                    <Button
                      bordered warning
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 4 }}
                      onPress={() => this.props.navigation.navigate("TablesList", {id:this.state.id})}
                    >
                      <Text>My Active Orders</Text>
                    </Button>

                  </Body>
                  


                </CardItem>
              </Card>
  );
}

renderTable(){
  if(this.state.islogged){
    if(!this.state.hasTable ){
      return(

        <Card>
                <CardItem>
                  <Body>
                  <Image source={require('../images/table-icon.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 4, marginBottom: 8 }} />

                    <Button
                      danger
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 4 }}
                      onPress={() => this.props.navigation.navigate("SitOnTable",{restaurant_id:this.state.id,user_id:this.state.userId})}
                    >
                      <Text>Sit on table</Text>
                    </Button>

                    <Button
                      bordered danger
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 4 }}
                      onPress={() => this.props.navigation.navigate("TablesList", {id:this.state.id})}
                    >
                      <Text>Reserve a table</Text>
                    </Button>
                    </Body>
                  


                  </CardItem>
                </Card>

      );
    }
    else if(this.state.id==this.state.table_restaurant_id){
      return(
        <Card>
        <CardItem>
                  <Body>
                  <Image source={require('../images/table-icon.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 4, marginBottom: 8 }} />
                  <Text style={{alignSelf:'center', marginBottom:4}}>Table NO: {this.state.table_no}</Text>

                    <View style={{flexDirection:'row',  alignSelf: 'center'}}>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8, marginLeft: 1, marginRight:1 }}
                      onPress={() => this.call_button()}
                    >
                      <Text>Call for waiter</Text>
                    </Button>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8,  marginLeft: 1, marginRight:1  }}
                      onPress={() => this.clean_button()}
                    >

                      <Text>Clean the table</Text>
                    </Button>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8,  marginLeft: 1, marginRight:1  }}
                      onPress={() => this.pay_button()}
                    >

                      <Text>ask for the bill</Text>
                    </Button>


                    </View>

                    </Body>
                  


                  </CardItem>
                </Card>
      );
    }
  }
  
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

    Menu = this.state.data;
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

          <Content>

            <Content padder>
              <Content style={styles.RestaurantImage}>
                <Localimage source={logos[this.state.id]} originalWidth={1024} originalHeight={576} />
              </Content>
            </Content>

             <Content style={styles.TableReservation}>
              {this.renderPreorder()}
            </Content>

            <Content style={styles.TableReservation}>

            {this.renderTable()}

            </Content>

            {/*<MenuList data={this.data} toDish={this.toDish}/>*/}


            <View style={{ backgroundColor: 'white', marginTop:8}}>

                       <Image source={require('../images/menu.png')} style={{width: 100, height: 100,alignSelf:'center', marginBottom:8,marginTop:8}}/>


              <List>
               {this.renderMenu()}
              </List>

            </View>



          </Content>
        </ImageBackground>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  RestaurantImage: {
    borderRadius: 10,
  },

  RestaurantMenu: {
    backgroundColor: 'white'
  }

});
