import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



import URL from '../URLs'


export default class WorkerList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.navigation.state.params.id,
      data: [],
      waiters: [],
      managers: [],
      chefs:[],
      isLoading: true,
      checked:0,
      
    }
    
  }


  getRestaurantWaiters(){
    url = URL.getRestaurantWaiters(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ waiters: responseJson, isLoading:false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  getRestaurantManagers(){
    url = URL.getRestaurantManagers(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ managers: responseJson, isLoading:false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  getRestaurantChefs(){
    url = URL.getRestaurantChefs(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ chefs: responseJson, isLoading:false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getRestaurantWaiters();
    this.getRestaurantManagers();
    this.getRestaurantChefs();
    
  }

  static navigationOptions = {
    title: 'Restaurants',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }


  renderWaiters() {
    
 
    return waiters.map((item) => {
        return (
          
          <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("")}>
          <Image source={require('../images/waiter.png')} style={{ width: 60, height: 60, }} />
          <Body>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          </Body>
        </ListItem>


        );
    });
}

renderManagers() {
    
 
  return managers.map((item) => {
      return (
        
        <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("")}>
        <Image source={require('../images/boss.png')} style={{ width: 60, height: 60, }} />
        <Body>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </Body>
      </ListItem>


      );
  });
}

renderChefs() {
    
 
  return chefs.map((item) => {
      return (
        
        <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("")}>
        <Image source={require('../images/chef.png')} style={{ width: 60, height: 60, }} />
        <Body>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
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
  waiters = this.state.waiters;
  managers = this.state.managers;
  chefs = this.state.chefs;

    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>
        
          <Content>
          <View style={{ backgroundColor: 'white' }}>

          <Button
                                warning
                                style={{ alignSelf: 'center', justifyContent: 'center', width: 300,marginTop:8 ,marginBottom: 8 }}
                                onPress={() => this.props.navigation.navigate("")}
                            >
                                <Text>Add New Worker</Text>
                            </Button>
          
          
            <List >

            <ListItem itemDivider>
              <Text>Managers</Text>
            </ListItem>
            
            {this.renderManagers()
            }

            <ListItem itemDivider>
              <Text>Waiters</Text>
            </ListItem>   
            {this.renderWaiters()
            }

            <ListItem itemDivider>
              <Text>Chefs</Text>
            </ListItem> 
            {
             this.renderChefs()
            }

            </List>

          </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD'
  },

});


