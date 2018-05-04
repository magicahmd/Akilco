import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View,Image , Alert} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import URL from '../URLs'

let images = {
    background: require('../images/background2.jpg'),
  }


export default class DishesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          id: this.props.navigation.state.params.id,
          isLoading: true,
          
        }
        
      }

      getdata() {
        url = URL.getDishesList(this.state.id);
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ data: responseJson , isLoading: false});
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      componentWillMount() {
    
        this.getdata();
      }

      renderDishes() {
    
 
        return Dishes.map((item) => {
            return (
              
                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("Dish",{id:item.id,name:item.name})}>
                    <Thumbnail square size={80} source={require('../images/Dinner-Icon.png')} />
                    <Body>
                      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    </Body>
                  </ListItem>
            );
        });
    }

delete_list(){
  url = URL.delete_List(this.state.id);
    fetch(url, {
      method: 'Delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) =>       this.props.navigation.navigate("Drawer") )

}

delete_button(){
  Alert.alert(
    'Delete this list',
    'Are you sure ?',
    [
      {text: 'Yes', onPress: () => this.delete_list()},
      {text: 'No', onPress: () => console.log('No')},
    ],
    { cancelable: false }
  )
}


  render() {

    if(this.state.isLoading){
        return(
            <Container>
        <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>
        
          <Content>
          <Image source={require('../images/loading-icon.gif')} style={{alignSelf:'center', marginTop:12, marginBottom:8}}/>
         
          </Content>
        </ImageBackground>
      </Container>

        )
    }

    Dishes = this.state.data;

    return (
      <Container>
        <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>
        
        <Button
            warning
            style={{ alignSelf: 'center', justifyContent: 'center', width: 300, marginTop: 4 }}
            onPress={() => this.props.navigation.navigate("AddDish")}
          >
            <Text>Add New Dish</Text>
          </Button>

          <Button
            danger
            style={{ alignSelf: 'center', justifyContent: 'center', width: 300, marginTop: 4, marginBottom:4 }}
            onPress={()=>this.delete_button()}
          >
            <Text>Delete the list</Text>
          </Button>
          
          <Content>
          <View style={{ backgroundColor: 'white' }}>    
                
          
            <List >
              
            {this.renderDishes()}

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


