import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground } from "react-native";
import {Button,Text,Container,Card,CardItem,Body,Content,Header,Title,Left,Icon,Right} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class HomeScreen extends React.Component {

    

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/Resbackground.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>

        <Content style={styles.HomeContent}>

        <Text>Orders</Text>

        
          
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  HomeContent:{
    marginTop: 70,
    marginLeft: 8,
    marginRight:8, 
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6, 
  },
});
