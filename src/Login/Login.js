import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View,AsyncStorage } from "react-native";
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

import URL from '../URLs'


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      role: [],
      email: "",
      password: "",

    }
  }

  ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      return (true)
    }
    return (false)
  }

  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

  check_login_validation() {
    if (this.state.email == '')
      alert('Plese enter your email');
    else if(!this.ValidateEmail())
    alert("You have entered an invalid email address!")
    else if (this.state.password == '')
      alert('Plese enter your password');
    else
     // alert(this.state.password);
     this.check_login();
  }

  check_login(){
    url = URL.check_login();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson});

      if(this.isEmpty(this.state.data)){
        alert('incorrect');
      }
      else{
        this.user_role(this.state.data[0].id);
      }

    });

  }

  user_role(id){
    url = URL.getUserRoles(id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ role: responseJson, isLoading: false });
       this.assign_user();


      })
      .catch((error) => {
        console.error(error);
      });
  }

  assign_user(){
    user = {
      userId: this.state.data[0].id,
      userName: this.state.data[0].name,
      iSManager: false,
      isWaiter: false,
    }

    if(this.state.role.length!=0){
      if(this.state.role[0].pivot.role_id==2){
        user.resId = this.state.role[0].pivot.restaurant_id;
        user.iSManager=true;
      }

      if(this.state.role[0].pivot.role_id==3){
        user.resId = this.state.role[0].pivot.restaurant_id;
        user.isWaiter=true;
      }
     
    }
    AsyncStorage.setItem('USER', JSON.stringify(user));
    this.props.navigation.navigate("Drawer");
   //this.props.navigation.goBack(this.forceUpdate());
    
  }


  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>


          <Content padder>

            <View style={styles.HomeContent}>

              <Image source={require('../images/LoginIcon.png')} style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 20, }} />

              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input onChangeText={(email) => this.setState({ email })} />
                </Item>

                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                </Item>

                {/*  <Item floatingLabel password>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})} />
          </Item>
        
        */}

                <Button
                  danger
                  style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 20, marginBottom: 10 }}
                  onPress={() => this.check_login_validation()}
                >
                  <Text>Login</Text>
                </Button>

                <Text style={{ alignSelf: 'center', color: '#a62127', fontWeight: 'bold', marginBottom: 20 }} onPress={() => this.props.navigation.navigate("Signup")}>Sign up?</Text>

              </Form>

            </View>




          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  HomeContent: {
    marginTop: 50,
    marginLeft: 8,
    marginRight: 8,
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
});

