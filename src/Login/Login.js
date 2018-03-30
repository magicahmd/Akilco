import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View} from "react-native";
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
  Form,
  Item,
  Label,
  Input,
} from "native-base";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class HomeScreen extends React.Component {

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        

        <Content padder>

        <View style={styles.HomeContent}>
        
        <Image source={require('../images/LoginIcon.png')} style={{width: 120, height: 120,alignSelf:'center', marginTop:20,}}/>

        <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel password>
              <Label>Password</Label>
              <Input secureTextEntry={true} />
            </Item>

            <Button
            danger
            style={{alignSelf:'center',justifyContent:'center' ,width:180, marginTop: 20, marginBottom:10}}
            onPress={() => this.props.navigation.navigate("RestaurantsList")}
          >
            <Text>Login</Text>
          </Button>

          <Text style={{alignSelf:'center', color:'#a62127',fontWeight:'bold', marginBottom: 20}} onPress={() => this.props.navigation.navigate("Signup")}>Sign up?</Text>

          </Form>

          </View>

        
        
          
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  HomeContent:{
    marginTop: 50,
    marginLeft: 8,
    marginRight:8, 
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6, 
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
});

