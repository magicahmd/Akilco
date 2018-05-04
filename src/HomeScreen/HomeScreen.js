import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View, FlatList,AsyncStorage,Alert } from "react-native";
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


/*

let user = {
  userId: 0,
  userName: '',
  iSManager: false,
  isWaiter: false,
  resId: 0,
}

AsyncStorage.setItem('USER', JSON.stringify(user));

//AsyncStorage.removeItem('USER');

*/


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      islogged:false,
    }
    
  }


  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  logout(){
    AsyncStorage.removeItem('USER');
    this.props.navigation.navigate("Drawer");
  }

  componentWillMount(){
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
      }
    });
  }

  renderButtons(){
    if(this.state.islogged){
      return(
        <View>
           <Button
                  bordered danger
                  style={{ alignSelf: 'center', justifyContent: 'center', width: 180, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 4, marginBottom: 8 }}
                  onPress={() => this.logout()}
                >
                  <Text>Logout</Text>
                </Button>
          </View>
      ) 
    }

    else{
      return(
        <View>
          <Button
                bordered danger
                style={{ alignSelf: 'center', justifyContent: 'center', width: 180, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 4, marginBottom: 8 }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text>Login</Text>
              </Button>
  
              <Text style={{ alignSelf: 'center', color: '#a62127', fontWeight: 'bold', marginBottom: 12 }}
                onPress={() => this.props.navigation.navigate("Signup")}>Sign up?</Text>
          </View>
      )
    }
    
  }



  Welcome(){
    if(this.state.userName && this.state.iSManager)
    return(
      <Card style={{backgroundColor: 'rgba(255,255,255,0.75)'}}>
              <CardItem>
                <Body>
                  
                  <Text style={{ alignSelf: 'center', marginBottom:8}} > Welcome, {this.state.userName}</Text>


                  <Button
                    warning
                    style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginBottom: 4 }}
                    onPress={() => this.props.navigation.navigate("ManagerHome",{id: this.state.resId})}>
                    <Icon name='star' />
                    <Text>MANAGER</Text>
                  </Button>

                </Body>
              </CardItem>
            </Card>
    )



    else if(this.state.userName && this.state.isWaiter)
    return(
      <Card style={{backgroundColor: 'rgba(255,255,255,0.75)'}}>
              <CardItem>
                <Body>
                  
                  <Text style={{ alignSelf: 'center', marginBottom:8}} > Welcome, {this.state.userName}</Text>

                  <Button
                    warning
                    style={{ alignSelf: 'center', justifyContent: 'center', width: 180 }}
                    onPress={() => this.props.navigation.navigate("")}>
                    <Text>Waiter</Text>
                  </Button>


                </Body>
              </CardItem>
            </Card>
    )

    else if(this.state.userName)
    return(
      <Card style={{backgroundColor: 'rgba(255,255,255,0.75)'}}>
              <CardItem>
                <Body>
                  
                  <Text style={{ alignSelf: 'center', marginBottom:4}} > Welcome, {this.state.userName}</Text>


                </Body>
              </CardItem>
            </Card>
    )
  }


  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/Resbackground.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>
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


              <Image source={require('../images/Akilcologo.png')} style={{ width: 200, height: 174, alignSelf: 'center', marginTop: 12, marginBottom: 8 }} />

              <Button
                danger
                style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("RestaurantsList")}
              >
                <Text>Restaurants</Text>
              </Button>

              {this.renderButtons()}

               

            </Content>

            {this.Welcome()}

          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  HomeContent: {
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8,
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
  },
});

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    title: 'Home',
    header: (
      <Header style={{ backgroundColor: '#a62127' }}>
        <Left />
        <Body />
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate("DrawerOpen")}
          >
            <MaterialIcons
              name="menu"
              size={24}
              style={{ color: 'rgba(255,255,255,0.8)' }}>

            </MaterialIcons>
          </Button>
        </Right>
      </Header>
    )
  };
};
