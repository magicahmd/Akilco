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




export default class AddNewTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        data: [],
        id: this.props.navigation.state.params.id,
        seats_no:0,
        isLoading: true,

    }
}

  addTable() {
    if(this.state.seats_no==""){
      alert('you should write the number of seats');
    }
    
    else{
      url = URL.add_table();
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: this.state.id,
          seats_no: this.state.seats_no,
          name: this.state.table_no,
        }),
      });
  
       this.props.navigation.navigate("Drawer");
      
    }
    
  }

   getdata() {
        url = URL.getRestaurantTablesCounter(this.state.id);
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ tables_counter: responseJson, isLoading:false });
          this.setState({table_no: this.state.tables_counter+1})
          
        })
        .catch((error) => {
          console.error(error);
        });
        }

    componentWillMount() {
        this.getdata();

    }

  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>


          <Content padder>

            <Image source={require('../images/table-icon.png')} style={{ width: 120, height: 120, alignSelf: 'center', }} />

            <View >
              <Form style={styles.signForm}>
                <Item>
                  <Input  keyboardType='numeric' placeholder='Number of seats' 
                  onChangeText={(seats_no) => this.setState({seats_no})} />
                </Item>

                <Button
                  warning
                  style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 20, marginBottom: 20 }}
                  onPress={() => this.addTable()}
                >
                  <Text>Add New Table</Text>
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

