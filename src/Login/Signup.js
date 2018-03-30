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
        <View >
        <Form style={styles.signForm}>
            <Item>
            <Input placeholder='User Name' />
            </Item>

            <Item>
            <Input placeholder='Full Name' />
            </Item>

            <Item>
            <Input placeholder='Email Address' />
            </Item>

            <Item>
            <Input placeholder='Phone Number' />
            </Item>

            <Item>
              <Input placeholder='Password' secureTextEntry={true} />
            </Item>
            
            <Item>
              <Input placeholder='Confirm Password' secureTextEntry={true} />
            </Item>

            <Button
            danger
            style={{alignSelf:'center',justifyContent:'center' ,width:180, marginTop: 20, marginBottom:20}}
            onPress={() => this.props.navigation.navigate("RestaurantsList")}
          >
            <Text>Sign Up</Text>
          </Button>

          </Form>

          </View>

        
        
          
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
 
  signForm:{
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6, 
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  }
});

