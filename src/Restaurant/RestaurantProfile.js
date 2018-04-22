import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View, } from "react-native";
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

let logos = {
  1: require('../images/pizza-hut-image.jpg'),
  3:  require('../images/kfc-image.png'),
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
      isLoading: true,

    }
  }

  getdata() {
    return fetch('http://10.0.0.7/Server/public/api/resMenus/'+this.state.id)
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



{/*
    this.data = [
      {
        groupHeaderData: { title: 'وجبات رئيسية' },
        groupListData: ['مقلوبة', 'أوزي', 'سمك']
      },
      {
        groupHeaderData: { title: 'مقبّلات' },
        groupListData: ['1', '2', '3']
      },
      {
        groupHeaderData: { title: 'مشروبات باردة' },
        groupListData: ['1', '2', '3']
      },
      {
        groupHeaderData: { title: 'مشروبات ساخنة' },
        groupListData: ['1', '2', '3']
      }
    ],*/}
    //  this.toDish = this.props.navigation;

  }

  renderMenu() {
    
 
    return Menu.map((item) => {
        return (
          
          <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("DishesList", { id: item.id })}>
          <Thumbnail square size={60} source={ require('../images/MenuLogo.png')} />
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{item.menuName}</Text>
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

            <Image source={require('../images/table.png')} style={{width: 120, height: 120,alignSelf:'center', marginBottom:8}}/>


            <Content style={styles.TableReservation}>
              <Card>
                <CardItem>
                  <Body>
                    <Text  style={{ alignSelf: 'center'}}>Your table is: </Text>

                    <Button
                      danger
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 10 }}
                      onPress={() => this.props.navigation.navigate("SitOnTable")}
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

                    <Button
                      dark
                      style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 4, marginBottom: 8 }}
                      onPress={() => this.props.navigation.navigate("")}
                    >
                      <Text>Cancel the reservation</Text>
                    </Button>

                    <View style={{flexDirection:'row',  alignSelf: 'center'}}>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8, marginLeft: 1, marginRight:1 }}
                      onPress={() => this.props.navigation.navigate("")}
                    >
                      <Text>Call for waiter</Text>
                    </Button>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8,  marginLeft: 1, marginRight:1  }}
                      onPress={() => this.props.navigation.navigate("")}
                    >

                      <Text>Clean the table</Text>
                    </Button>

                    <Button
                      warning
                      style={{ alignSelf:'center', justifyContent: 'center', width: 100, marginTop: 4, marginBottom: 8,  marginLeft: 1, marginRight:1  }}
                      onPress={() => this.props.navigation.navigate("")}
                    >

                      <Text>ask for the bill</Text>
                    </Button>

                    </View>

                  </Body>
                  


                </CardItem>
              </Card>
            </Content>

            {/*<MenuList data={this.data} toDish={this.toDish}/>*/}


           <Image source={require('../images/Menu.png')} style={{width: 120, height: 120,alignSelf:'center', marginBottom:8}}/>
            <View style={{ backgroundColor: 'white',}}>

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
