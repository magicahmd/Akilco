import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import URL from '../URLs'


export default class WaiterTables extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: this.props.navigation.state.params.id,
      user_id: this.props.navigation.state.params.user_id,
      isLoading: true,
      
    }
    
  }

  getdata() {
    url = URL.getWaiterTables(this.state.user_id,this.state.id);
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson, isLoading:false });        
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillMount() {
    this.getdata();
  }

  static navigationOptions = {
    title: 'Restaurants',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
  }


  renderButtons() {
    
 
    return tables.map((item) => {

          return (
          
            <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("",{id:item.id,restaurant_id:this.state.id})}>
                <Thumbnail square size={80} source={require('../images/table-icon.png')} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>Table No: {item.name}</Text>
                  <Text note >id: {item.id} </Text>
                  <Text note >Client id: {item.user_id} </Text>
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

    tables = this.state.data;

    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

          <Content>
          <View style={{ backgroundColor: 'white' }}>

           
          
          
            <List >
              
            {this.renderButtons()}

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


