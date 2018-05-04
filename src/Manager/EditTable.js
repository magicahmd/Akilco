import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right, Item, Input, Form, Label } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'


export default class EditTable extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.navigation.state.params.id,
            isReady: false,
            pickedTime: '',
            checked:0,

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
        return fetch('http://10.0.0.7/Server/public/api/allTables')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson[0]});


            })
            .catch((error) => {
                console.error(error);
            });
    }

    getWaitersData() {
        return fetch('http://10.0.0.7/Server/public/api/ResNames')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ WaitersData: responseJson, isLoading:false });
            
          })
          .catch((error) => {
            console.error(error);
          });
      }

    componentWillMount() {

        this.getdata();
        this.getWaitersData();
    }

    renderWaiters() 
    {   
        if(WaitersData!=null){
            return this.state.WaitersData.map((item,key) => {
        return (
          <View style={{marginLeft:10}}>
            {this.state.checked==key?
          <TouchableOpacity style={{flexDirection:'row'}}>
                            <Image style={{width:25,height:25}} source={require('../images/filledButton.png')} />
                            <Text>checked</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.setState({checked:key})}}>
              <Image style={{width:25,height:25}} source={require('../images/unfilledButton.png')} />
              <Text>unchecked</Text>
              </TouchableOpacity>  
          }
            
            </View>
          
        );
    });
}
 else return(<View></View>)   
 
     
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

       else{
        TableData = this.state.data;
        WaitersData = this.state.WaitersData;

        return (
            <Container>
                <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

                    <Content padder>

                        <Form style={styles.signForm}>
                            <Item floatingLabel>
                                <Label>Table No</Label>
                                <Input value={TableData.tableName} />
                            </Item>

                            <Text>{TableData.seatNo}</Text>
                            
                            <Item floatingLabel>
                                <Label>Seats No</Label>
                                <Input value={TableData.seatNo} />
                            </Item>

                            {this.renderWaiters()}


                            <Button
                                warning
                                style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 20, marginBottom: 20 }}
                                onPress={() => this.props.navigation.navigate("")}
                            >
                                <Text>Update</Text>
                            </Button>

                        </Form>





                    </Content>
                </ImageBackground>
            </Container>
        );

       }


        
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

    signForm: {
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.3)',
    }

});
