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
import {RestaurantMenu} from './RestaurantMenu/index'



export default class RestaurantProfile extends React.Component {

  static navigationOptions = {
    title: 'aaaaaaaa',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    }

  componentWillMount() {
    this.data = [
      {
        groupHeaderData: {title: 'Dashboard'},
        groupListData: ['Calls', 'Chart', 'Map']
      },
      {
        groupHeaderData: {title: 'Profile'},
        groupListData: ['User', 'Add contact', 'Calendar']
      },
      {
        groupHeaderData: {title: 'Messages'},
        groupListData: ['Inbox', 'Sent', 'Deleted']
      },
      {
        groupHeaderData: {title: 'Settings'},
        groupListData: ['Fill Beer', 'Adjust', 'Alarm']
      }
    ]
  }

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        
        <Content>

          <Button onPress={() => this.props.navigation.navigate("HomeScreen")}>
        <Text style={styles.listItemText}>Teeeest</Text>
        </Button>

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
                <Button onPress={() => this.props.navigation.navigate("Dish")} ><Text>Test it.</Text></Button>
              </Body>
            </CardItem>
          </Card>
        </Content>

       
        <RestaurantMenu/>

          
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
