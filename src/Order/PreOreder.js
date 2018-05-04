import React, { Component } from 'react';
import { ImageBackground, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Button, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

let logos = {
    pizzaHut: require('../images/pizza-hut.jpg'),
    kfc: require('../images/kfc-logo.png'),
}


export default class PreOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            checked: 0,

        }

    }

    getdata() {
        return fetch('http://10.0.0.7/Server/public/api/ResNames')
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
        console.log('Hey, This application sucks.')
    }

    static navigationOptions = {
        title: 'Restaurants',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#a62127', borderBottomColor: '#a62127' },
    }

    renderPreOrder() {


        return restaurants.map((item) => {
            return (

                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("RestaurantProfile", { id: item.resId })}>
                    <Thumbnail square size={80} source={logos[item.resLogo]} />
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>{item.resName}</Text>
                        <Text note style={{ color: 'green' }}>{this.state.id}</Text>
                    </Body>
                </ListItem>

            );
        });
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

        PreOrder = this.state.data;

        return (
            <Container>
                <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>

                    <Content>
                        <View style={{ backgroundColor: 'white' }}>


                            <List >

                                 

                                <ListItem itemDivider>

                                <Right>
                                <Text>الصنف</Text>
                                    </Right>
                                    
                                <Left/>
                                <Text>المجموع</Text>
                                <Text>السعر</Text>
                                <Text>الكمية</Text>
                               
                                    
                                </ListItem>

                                {this.renderPreOrder()}


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


