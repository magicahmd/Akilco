import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, TouchableOpacity, View, Alert } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right, Item, Input } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import URL from '../URLs'

export default class sendOrder extends React.Component {




    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.navigation.state.params.id,
            user_id: this.props.navigation.state.params.user_id,
            total_price: this.props.navigation.state.params.total_price,
            table_id: this.props.navigation.state.params.table_id,
            checked: 0,

            order_types: [
                {
                    type: 'Take Away',
                },

            ],

        }
    }


    getdata() {
        url = URL.getPreorderList(this.state.user_id, this.state.id);
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson, isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    renderTypes() {


        return this.state.order_types.map((item, key) => {
            return (


                <CardItem>
                    {this.state.checked == key ?
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 25, height: 25, marginRight: 6 }} source={require('../images/filledButton.png')} />
                            <Text>{item.type}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this.setState({ checked: key, }); }}>
                            <Image style={{ width: 25, height: 25, marginRight: 6 }} source={require('../images/unfilledButton.png')} />
                            <Text>{item.type}</Text>
                        </TouchableOpacity>
                    }
                </CardItem>

            );
        });
    }

    send_order() {
        url = URL.send_order();

        if (this.state.checked == 0) {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    restaurant_id: this.state.id,
                    bill: this.state.total_price,
                }),
            });
        }

        if (this.state.checked == 1) {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    restaurant_id: this.state.id,
                    bill: this.state.total_price,
                    table_id: this.state.table_id,
                }),
            });
        }


        alert('Your Order has been sent.');
        
        this.props.navigation.navigate("Drawer");


    }



    componentWillMount() {
        this.getdata();
        if (this.state.table_id != undefined) {
            this.setState({ order_types: this.state.order_types.concat({ type: 'Table' }) });
        }
    }


    renderOrders() {


        return orders.map((item) => {
            return (

                <CardItem>



                    <View style={{ flexDirection: 'column' }}>
                        <Text >{item.dish_name}</Text>
                        <Text style={{ fontSize: 10 }} >({item.dish_size})</Text>
                    </View>

                    <Left />
                    <Body />
                    <Right/>


                    <Text >{item.quantity}×{item.dish_price} = {item.quantity * item.dish_price}</Text>


                </CardItem>
            );
        });
    }




    render() {

        orders = this.state.data;

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


        return (
            <Container>
                <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

                    <Content padder>


                        <Card>
                            {this.renderOrders()}


                            <View
                                style={{
                                    borderBottomColor: 'rgba(0,0,0,0.2)',
                                    borderBottomWidth: 1,
                                }}
                            />



                            <CardItem>

                                <Left>
                                    <Text>Total</Text>
                                </Left>

                                <Right>
                                    <Text style={{ fontWeight: 'bold' }}>₪ {this.state.total_price}</Text>
                                </Right>

                            </CardItem>


                        </Card>

                        <Card>

                            {this.renderTypes()}


                            <CardItem>

                                <Body>
                                    <Button
                                        warning
                                        style={{ alignSelf: 'center', justifyContent: 'center', width: 200, marginBottom: 8 }}
                                        onPress={() => this.send_order()}
                                    >
                                        <Text>Send Order</Text>
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
