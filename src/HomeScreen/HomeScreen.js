import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground } from "react-native";
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
  Right
} from "native-base";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class HomeScreen extends React.Component {

  
  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    }
    

  render() {
    return (
      <Container>
         <ImageBackground source={require('../images/Resbackground.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>
        {/*<Header style={{backgroundColor:'#a62127'}}>
          <Left/>
          <Body>
          </Body>
          <Right>
          <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <MaterialIcons
                name="menu"
                size={24}
                style={{color: 'rgba(255,255,255,0.8)'}}>
                    
                    </MaterialIcons>
            </Button>
          </Right>
        </Header>
        */}

        <Content padder>
        <Content style={styles.HomeContent}>

        <Image source={require('../images/Akilcologo.png')} style={{width: 200, height: 174,alignSelf:'center', marginTop:12, marginBottom:8}}/>

        <Button
            danger
            style={{alignSelf:'center',justifyContent:'center' ,width:180, marginTop: 10}}
            onPress={() => this.props.navigation.navigate("RestaurantsList")}
          >
            <Text>Restaurants</Text>
          </Button>
          <Button
            bordered danger
            style={{alignSelf:'center',justifyContent:'center' ,width:180, backgroundColor:'rgba(255,255,255,0.7)',marginTop: 4, marginBottom: 8}}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Login</Text>
          </Button>

          <Text style={{alignSelf:'center', color:'#a62127',fontWeight:'bold', marginBottom: 12}} onPress={() => this.props.navigation.navigate("Signup")}>Sign up?</Text>
          </Content>
        
          <Card>
            <CardItem>
              <Body>
                <Text>If I want something here later!</Text>
              </Body>
            </CardItem>
          </Card>
          
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

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    title:'Home',
    header: (
      <Header style={{backgroundColor:'#a62127'}}>
        <Left/>
        <Body/>
        <Right>
          <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}
            >
              <MaterialIcons
                name="menu"
                size={24}
                style={{color: 'rgba(255,255,255,0.8)'}}>
                    
                    </MaterialIcons>
            </Button>
          </Right>
      </Header>
    )
  };
};
