import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground,View,List,ListItem, } from "react-native";
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
LayoutAnimation
} from "native-base";


import ExpandableList from './ExpandableList'
import {Constants} from "./Constants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Localimage from '../../Components/Localimage'
//import {RestaurantMenu} from './RestaurantMenu/index'
import {MenuList} from "./RestaurantMenu/List";




export default class RestaurantProfile extends React.Component {

  static navigationOptions = {
    title: 'aaaaaaaa',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    }

  componentWillMount() {

    this.data = [
      {
        groupHeaderData: {title: 'وجبات رئيسية'},
        groupListData: ['مقلوبة', 'أوزي', 'سمك']
      },
      {
        groupHeaderData: {title: 'مقبّلات'},
        groupListData: ['1', '2', '3']
      },
      {
        groupHeaderData: {title: 'مشروبات باردة'},
        groupListData: ['1', '2', '3']
      },
      {
        groupHeaderData: {title: 'مشروبات ساخنة'},
        groupListData: ['1', '2', '3']
      }
    ],
    this.toDish = this.props.navigation;

  }

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        
        <Content>

        <Content padder>
        <Content style={styles.RestaurantImage}>
        <Localimage source={require('../images/pizza-hut-image.jpg')} originalWidth={1024} originalHeight={576}  />
        </Content>
        </Content>

        <Content style={styles.TableReservation}>
          <Card>
            <CardItem>
              <Body>
                <Text>For tables</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>

       
       <MenuList data={this.data} toDish={this.toDish}/>

          
        </Content>
        </ImageBackground>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  RestaurantImage:{
    borderRadius: 10,
  },

  RestaurantMenu:{
    backgroundColor:'white'
  }
 
});
