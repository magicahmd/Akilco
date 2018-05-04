import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View } from "react-native";
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




export default class AddNewList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        data: [],
        id: this.props.navigation.state.params.id,
        menu_name:"",
        isLoading: true,

    }
}

  addList() {
    if(this.state.menu_name==""){
      alert('you should write the list name');
    }
    
    else{
      url = URL.add_List();
      fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant_id: this.state.id,
        name: this.state.menu_name,
      }),
    });

     this.props.navigation.navigate("Drawer");
      
    }
    
  }

  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>


          <Content padder>

            <Image source={require('../images/plus.png')} style={{ width: 100, height: 100, alignSelf: 'center', }} />

            <View >
              <Form style={styles.signForm}>
                <Item>
                  <Input placeholder='List name'
                  onChangeText={(menu_name) => this.setState({menu_name})} />
                </Item>

                <Button
                  warning
                  style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 20, marginBottom: 20 }}
                  onPress={() => this.addList()}
                >
                  <Text>Add New List</Text>
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

  signForm: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  }
});

