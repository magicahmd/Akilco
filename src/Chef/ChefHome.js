import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View, TouchableOpacity } from "react-native";
import { DeviceEventEmitter } from 'react-native'
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
    ListView,
    ScrollView,
    FlatList,
    List, ListItem,
    Thumbnail,
    LayoutAnimation
} from "native-base";

let logos = {
    1: require('../images/pizza-hut-image.jpg'),
    2: require('../images/kfc-image.png'),
}

import URL from '../URLs'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Localimage from '../../Components/Localimage'
//import {RestaurantMenu} from './RestaurantMenu/index'
//import {MenuList} from "./RestaurantMenu/List";




export default class ChefHome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.navigation.state.params.id,
            user_id: this.props.navigation.state.params.user_id,
            isLoading: true,
            count: [],

        }
    }

    getdata() {
        url = URL.getCookingOrders(this.state.id);
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson, isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderNotification(count) {
        if (count > 0)
            return (
                <Image source={require('../images/point.png')} style={{ width: 9, height: 9, alignSelf: 'flex-end', marginRight: 5, marginTop: 3 }} />
            )
        else
            return (
                <Image style={{ width: 6, height: 6, alignSelf: 'flex-end', marginRight: 5, marginTop: 3 }} />
            )

    }

    componentWillMount() {
        setInterval(() =>   this.getdata(), 5000)
        this.getdata();
      




    }

    renderMenu() {


        return Menu.map((item) => {
            return (

                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("OrderInfo",{id:item.id,status:'Cooking'})}>
                <Thumbnail square size={80} source={require('../images/MenuLogo.png')} />
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>Order: {item.id}</Text>
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

        Menu = this.state.data;

        return (
            <Container>
                <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>
                    <Content>
                        <Content padder>
                            <Content style={styles.RestaurantImage}>
                                <Localimage source={logos[this.state.id]} originalWidth={1024} originalHeight={576} />
                            </Content>
                        </Content>

                        <Image source={require('../images/Cooking.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 8 }} />

                        <View style={{ backgroundColor: 'white', }}>



                            <List>
                                {this.renderMenu()}
                            </List>

                        </View>



                    </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    RestaurantImage: {
        borderRadius: 10,
    },

    RestaurantMenu: {
        backgroundColor: 'white'
    }

});
