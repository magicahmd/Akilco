import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import { DeviceEventEmitter } from 'react-native'
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right, Item, Input } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import URL from '../URLs'

export default class EditOrder extends React.Component {

  /*constructor(props){
    super(props);
    this.state={
       count:1,
       itemPrice:30,
       totalPrice: 30,
    }
  }*/

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: this.props.navigation.state.params.id,
      user_id: this.props.navigation.state.params.user_id,
      restaurant_id: this.props.navigation.state.params.restaurant_id,
      refresh: this.props.navigation.state.params.refresh,
      name: this.props.navigation.state.params.name,
      dish_size: "",
      note: "",
      count: 1,
      itemPrice: 0,
      totalPrice: 0,
      checked: 0,

    }
  }

  getdata() {
    url = URL.show_order_info(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, note: responseJson.note, itemPrice: responseJson.dish_price, count: responseJson.quantity, dish_size: responseJson.dish_size, totalPrice: responseJson.dish_price * responseJson.quantity, isLoading: false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.getdata();
    //alert(this.state.id);
  }

  increment() {
    this.setState({
      count: this.state.count + 1,
      totalPrice: (this.state.count + 1) * this.state.itemPrice
    })
  }

  decrement() {

    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1,
        totalPrice: (this.state.count - 1) * this.state.itemPrice
      })
    }

  }


  add_preorder() {
    url = URL.edit_order(this.state.id);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: this.state.count,
        note: this.state.note,
      }),
    });

    DeviceEventEmitter.emit('refreshWaiterOrderList', {});
    this.props.navigation.goBack('');

  }

  delete_preorder() {
    url = URL.delete_order_info(this.state.id);
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    DeviceEventEmitter.emit('refreshWaiterOrderList', {});
    this.props.navigation.goBack('');

  }



  render() {

    if (this.state.isLoading) {
      return (
        <Container>
          <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

            <Content>
              <Image source={require('../images/loading-icon.gif')} style={{ alignSelf: 'center', marginTop: 12, marginBottom: 8 }} />

            </Content>
          </ImageBackground>
        </Container>

      )
    }

    dishData = this.state.data;

    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

          <Content padder>

            <Card>
              <CardItem>

                <Left>
                  <Text style={{ fontWeight: 'bold' }}>{this.state.data.dish_name}</Text>
                </Left>

                <Right>
                  <Text style={{ fontSize: 15, color: 'black' }}>₪ {this.state.itemPrice}</Text>
                </Right>

              </CardItem>

            </Card>

            <Card>
              <CardItem>

                <Left>
                  <Text style={{ fontWeight: 'bold' }}>Size: {this.state.data.dish_size}</Text>
                </Left>

              </CardItem>



            </Card>

            <Card>
              <CardItem>
                <Text style={{ fontWeight: 'bold' }}>Notes</Text>

                <Left />
                <Right>
                </Right>
              </CardItem>

              <Item inlineLabel last><Input onChangeText={(note) => this.setState({ note })} placeholder='Add your notes' value={this.state.note} style={{ textAlign: 'left', marginLeft: 10 }} /></Item>
            </Card>

            <Card>
              <CardItem>
                <Text >Quantity</Text>

                <Left>

                </Left>

                <Right>

                </Right>

                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center', }}>{this.state.count}</Text>
                  <Button danger style={{ width: 45, marginRight: 5, marginLeft: 5, justifyContent: 'center' }} onPress={() => this.increment()}><Text style={{ alignSelf: 'center', }}>+</Text></Button>
                  <Button danger style={{ width: 45, justifyContent: 'center' }} onPress={() => this.decrement()}><Text style={{ alignSelf: 'center', }}>-</Text></Button>
                </View>

              </CardItem>

              <CardItem>

                <Text style={{ fontWeight: 'bold' }}>Total Price</Text>

                <Left>
                </Left>


                <Right>
                </Right>

                <Text style={{ fontSize: 15, color: 'black' }}>{this.state.count} × {this.state.itemPrice} = ₪ {this.state.totalPrice}</Text>




              </CardItem>

              <CardItem>
                <Body>

                  <Button
                    warning
                    style={{ alignSelf: 'center', justifyContent: 'center', width: 200, marginTop: 4, }}
                    onPress={() => this.add_preorder()}>
                    <Text>Edit your Pre-order</Text>
                  </Button>

                  <Button
                    danger
                    style={{ alignSelf: 'center', justifyContent: 'center', width: 200, marginTop: 4 }}
                    onPress={() => this.delete_preorder()}>
                    <Text>Delete this item.</Text>
                  </Button>


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
  HomeContent: {
    marginTop: 70,
    marginLeft: 8,
    marginRight: 8,
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
  },

});
