import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right, Item, Input } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import URL from '../URLs'


export default class Dish extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: this.props.navigation.state.params.id,
      isReady: false,
      pickedTime: '',

    }
  }

  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = (datetime) => this.setState({ 
    isDateTimePickerVisible: false,

   });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({
      pickedTime: moment(date).format('hh:mm')
    });
    this._hideDateTimePicker();
  };

  getdata() {
    url = URL.getTable(this.state.id)
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, isLoading: false });


      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {

    this.getdata();
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

    TableData = this.state.data;

    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

          <Content padder>

            <Card>
              <CardItem>

                <Left>
                  <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{TableData.name}</Text>
                </Left>

                <Right>
                  <Text>رقم الطاولة</Text>
                </Right>

              </CardItem>

              <CardItem>

                <Left>
                  <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{TableData.seats_no}</Text>
                </Left>

                <Right>
                  <Text>عدد المقاعد</Text>
                </Right>

              </CardItem>

            </Card>

            <Card>

              <CardItem>

                <Left>
                  <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{this.state.pickedTime}</Text>
                </Left>

                <Right>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text>اختيار الوقت</Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                  />
                </Right>

              </CardItem>

              <CardItem>
                <Right>
                  
                </Right>
              </CardItem>




              <CardItem>
                <Body>
                  <Button
                    warning
                    style={{ alignSelf: 'center', justifyContent: 'center', width: 200, marginBottom: 8 }}
                    onPress={() => this.props.navigation.navigate("")}>
                    <Text>إرسال حجز الطاولة</Text>
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
