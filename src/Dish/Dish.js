import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right, Item, Input } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import URL from '../URLs'

export default class Dish extends React.Component {

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
      name: this.props.navigation.state.params.name,
      discription: this.props.navigation.state.params.dish_discription,
      dish_size: "",
      notice: "",
      count: 1,
      itemPrice: 0,
      totalPrice: 0,
      checked: 0,

    }
  }

  getdata() {
    url = URL.getDishSizes(this.state.id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, itemPrice: responseJson[0].pivot.price, totalPrice: responseJson[0].pivot.price, dish_size: responseJson[0].name, isLoading: false });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {

    this.getdata();

    if (this.state.user_id == undefined) {
      this.setState({ isLogged: false });
    }

    else {
      this.setState({ isLogged: true });
    }

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

  renderSizes() {
    return dishData.map((item, key) => {

      return (

        <CardItem>
          {this.state.checked == key ?
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Image style={{ width: 25, height: 25, marginRight: 6 }} source={require('../images/filledButton.png')} />
              <Text>{item.name} : ₪{item.pivot.price}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this.setState({ checked: key, itemPrice: dishData[key].pivot.price, totalPrice: dishData[key].pivot.price, count: 1, dish_size: item.name }); }}>
              <Image style={{ width: 25, height: 25, marginRight: 6 }} source={require('../images/unfilledButton.png')} />
              <Text>{item.name} : ₪{item.pivot.price}</Text>
            </TouchableOpacity>
          }
        </CardItem>
      );
    });


  }

  renderInputs() {
    if (this.state.isLogged) {
      return (
        <Card>
          <CardItem>
            
             <Text>Quantity</Text>
<Left/>
          <Body/>
            <Right/>
            <View style={{ justifyContent: 'center', flexDirection:'row' }}>
            <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center', }}>{this.state.count}</Text>
            <Button danger style={{ width: 45, marginRight: 5, marginLeft: 5, justifyContent: 'center' }} onPress={() => this.increment()}><Text style={{ alignSelf: 'center', }}>+</Text></Button>
            <Button danger style={{ width: 45, justifyContent: 'center' }} onPress={() => this.decrement()}><Text style={{ alignSelf: 'center', }}>-</Text></Button>

              </View>
         


          </CardItem>

          <CardItem>


            <Left>
              <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
            </Left>


            <Right>
              <Text style={{ fontSize: 15, color: 'black' }}>{this.state.count} × {this.state.itemPrice} = ₪ {this.state.totalPrice}</Text>
            </Right>



          </CardItem>

          <CardItem>
            <Body>
              <Button
                warning
                style={{ alignSelf: 'center', justifyContent: 'center', width: 200, marginTop: 4, marginBottom: 8 }}
                onPress={() => this.add_preorder()}>
                <Text>Add to preorder</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      );
    }
  }


  add_preorder() {
    url = URL.add_preorder();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        restaurant_id: this.state.restaurant_id,
        dish_id: this.state.id,
        dish_name: this.state.name,
        dish_size: this.state.dish_size,
        dish_price: this.state.itemPrice,
        quantity: this.state.count,
        note: this.state.notice,
      }),
    });

    this.props.navigation.goBack(null);

  }

  renderNotes() {
    if (this.state.isLogged)
      return (
        <Card>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: 'bold' }}>Notes</Text>
            </Left>
            <Right>

            </Right>
          </CardItem>

          <Item inlineLabel last><Input onChangeText={(notice) => this.setState({ notice })} placeholder='Add your notes' style={{ textAlign: 'left', marginRight: 10 }} /></Item>
        </Card>

      );
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

            <Image source={require('../images/food.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 4, marginBottom: 8 }} />

            <Card>
              <CardItem>

                <Left>
                  <Text style={{ fontWeight: 'bold' }}>{this.state.name}</Text>
                </Left>

                <Right>
                  <Text style={{ fontSize: 15, color: 'black' }}>₪ {this.state.itemPrice}</Text>
                </Right>

              </CardItem>


              <CardItem>
                <Text >{this.state.discription}</Text>

                <Left>
                </Left>
                <Body />

                <Right>

                </Right>
              </CardItem>
            </Card>

            <Card>
              <CardItem>

                <Left>
                  <Text style={{ fontWeight: 'bold' }}>Size:</Text>
                </Left>

              </CardItem>

              {this.renderSizes()}

            </Card>

            {this.renderNotes()}
            {this.renderInputs()}





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
