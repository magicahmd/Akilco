import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View,AsyncStorage} from "react-native";
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
import URL from '../URLs'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      email: "",
      password: "",
      confirm_password:"",
      name: "",
      phone_no: "",

    }
  }

  ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      return (true)
    }
    return (false)
  }

  check_signup_validation(){
    if (this.state.name == '')
    alert('Please enter your name');
  else if (this.state.email == '')
    alert('Please enter your email');
  else if(!this.ValidateEmail())
  alert("You have entered an invalid email address!")
  else if (this.state.phone_no == '')
  alert('Please enter your phone number');
  else if (this.state.phone_no.length<7)
  alert('Please enter a right phone number');
  else if (this.state.password == '')
    alert('Please enter your password');
    else if (this.state.confirm_password == '')
    alert('Please confirm your password');
    else if(this.state.password!=this.state.confirm_password)
    alert("The two passwords don't match")
    else
    this.check_register();
  }

  check_register(){
    url = URL.sign_up();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        phone_no:this.state.phone_no,
        password:this.state.password,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson});

      if(this.state.data.length==0){
        alert('this email is already exists.');
      }
      else{
        this.assign_user();
      }

    });

  }

  assign_user(){
    user = {
      userId: this.state.data.id,
      userName: this.state.data.name,
      iSManager: false,
      isWaiter: false,
    }

    AsyncStorage.setItem('USER', JSON.stringify(user));
    this.props.navigation.navigate("Drawer");
   //this.props.navigation.goBack(this.forceUpdate());
    
  }

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        

        <Content padder>
        <View >
        <Form style={styles.signForm}>
            <Item>
            <Input placeholder='Name' onChangeText={(name) => this.setState({ name })}/>
            </Item>

            <Item>
            <Input placeholder='Email Address' onChangeText={(email) => this.setState({ email })} />
            </Item>

            <Item>
            <Input keyboardType='numeric' placeholder='Phone Number' onChangeText={(phone_no) => this.setState({ phone_no })} />
            </Item>

            <Item>
              <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
            </Item>
            
            <Item>
              <Input placeholder='Confirm Password' secureTextEntry={true} onChangeText={(confirm_password) => this.setState({ confirm_password })} />
            </Item>

            <Button
            danger
            style={{alignSelf:'center',justifyContent:'center' ,width:180, marginTop: 20, marginBottom:20}}
            onPress={() => this.check_signup_validation()}
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

