import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View, Image, AsyncStorage } from 'react-native';
import {DeviceEventEmitter} from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon, Footer, Title } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import URL from '../URLs'

let images = {
    background: require('../images/background2.jpg'),
}


export default class OrderInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.navigation.state.params.id,
            status: this.props.navigation.state.params.status,
            isLoading: true,
            total_price: 0

        }

    }

    approveOrder() {
        url = URL.approveOrder(this.state.id);
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                
                DeviceEventEmitter.emit('refreshWaiterSentOrders', {});
                this.props.navigation.goBack('');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    pickOrder() {
        url = URL.pickOrder(this.state.id);
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                DeviceEventEmitter.emit('refreshWaiterReadyOrders', {});
                this.props.navigation.goBack('');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    cookedOrder() {
        url = URL.cookedOrder(this.state.id);
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                DeviceEventEmitter.emit('refreshWaiterReadyOrders', {});
                this.props.navigation.goBack('');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    doneOrder() {
        url = URL.doneOrder(this.state.id);
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                DeviceEventEmitter.emit('refreshWaiterOnTableOrders', {});
                this.props.navigation.goBack('');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getdata() {
        url = URL.getOrderInfo(this.state.id);
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
        DeviceEventEmitter.addListener('refreshWaiterOrderList', (e)=>{this.getdata()});
        this.getdata();
    }

    renderDishes() {
        this.state.total_price = 0;

        return Dishes.map((item) => {
            this.state.total_price = this.state.total_price + (item.quantity * item.dish_price);

            if (this.state.status == 'Cooking'){
                return(
                    <ListItem style={styles.listItemContainer}>
                    <Thumbnail square size={80} source={require('../images/Dinner-Icon.png')} />
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>{item.dish_name}</Text>
                        <Text>Size: {item.dish_size}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text note style={{ fontWeight: 'bold' }} >Note: {item.note}</Text>
                    </Body>
                </ListItem>
                );
               
            }

            else
            return (

                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("EditOrder", { id: item.id })}>
                    <Thumbnail square size={80} source={require('../images/Dinner-Icon.png')} />
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>{item.dish_name}</Text>
                        <Text>Size: {item.dish_size}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Price: ₪ {item.dish_price}</Text>
                        <Text>Total price: ₪ {item.quantity * item.dish_price}</Text>

                    </Body>
                </ListItem>
            );
        });
    }

    renderFooter() {
        if (this.state.total_price > 0) {
            if (this.state.status == 'Sent')
                return (

                    <Footer>
                        <Left style={{ marginLeft: 15 }}>
                            <Text>Total Price:  </Text>
                            <Text>₪ {this.state.total_price} </Text>

                        </Left>
                        <Body />
                        <Right style={{ marginRight: 10 }}>
                            <Button
                                warning
                                style={{ justifyContent: 'center', width: 180, marginBottom: 4, marginTop: 4 }}
                                onPress={() => this.approveOrder()}>
                                <Text style={{ color: 'white' }}>Approve ✓</Text>
                            </Button>
                        </Right>
                    </Footer>

                );

                else if (this.state.status == 'Cooking') {
                    return (
                        <Footer>
                            <Body />
                            <Right style={{ marginRight: 10 }}>
                                <Button
                                    warning
                                    style={{ justifyContent: 'center', width: 180, marginBottom: 4, marginTop: 4 }}
                                    onPress={() => this.cookedOrder()}>
                                    <Text style={{ color: 'white' }}>Cooked ✓</Text>
                                </Button>
                            </Right>
                        </Footer>
                    );
    
                }

            else if (this.state.status == 'Ready') {
                return (
                    <Footer>
                        <Body />
                        <Right style={{ marginRight: 10 }}>
                            <Button
                                warning
                                style={{ justifyContent: 'center', width: 180, marginBottom: 4, marginTop: 4 }}
                                onPress={() => this.pickOrder()}>
                                <Text style={{ color: 'white' }}>Picked it ✓</Text>
                            </Button>
                        </Right>
                    </Footer>
                );

            }

           

            else if (this.state.status == 'on Table') {
                return (
                    <Footer>

                        <Left style={{ marginLeft: 15 }}>
                            <Text>Total Price:  </Text>
                            <Text>₪ {this.state.total_price} </Text>

                        </Left>

                        <Body />
                        <Right style={{ marginRight: 10 }}>
                            <Button
                                warning
                                style={{ justifyContent: 'center', width: 180, marginBottom: 4, marginTop: 4 }}
                                onPress={() => this.doneOrder()}>
                                <Text style={{ color: 'white' }}>Paid and Done ✓</Text>
                            </Button>
                        </Right>
                    </Footer>
                );

            }
        }


    }




    render() {

        if (this.state.isLoading) {
            return (
                <Container>
                    <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>

                        <Content>
                            <Image source={require('../images/loading-icon.gif')} style={{ alignSelf: 'center', marginTop: 12, marginBottom: 8 }} />

                        </Content>
                    </ImageBackground>
                </Container>

            )
        }

        Dishes = this.state.data;

        return (
            <Container>
                <ImageBackground source={images['background']} style={{ flex: 1, width: '100%', height: '100%' }}>

                    <Content>
                        <View style={{ backgroundColor: 'white' }}>

                            <List >

                                {this.renderDishes()}

                            </List>
                        </View>
                    </Content>

                    {this.renderFooter()}

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


