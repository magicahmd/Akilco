import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View, TouchableOpacity } from "react-native";
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




export default class ManagerHome extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.navigation.state.params.id,
            isLoading: true,

        }
    }

    getdata() {
        url = URL.getRestaurantMenu(this.state.id);
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

    renderMenu() {


        return Menu.map((item) => {
            return (

                <ListItem style={styles.listItemContainer} onPress={() => this.props.navigation.navigate("EditDishList", { id: item.id })}>
                    <Thumbnail square size={60} source={require('../images/MenuLogo.png')} />
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
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
                        <Image source={require('../images/crown-icon.png')} style={{ width: 200, height: 174, alignSelf: 'center' }} />

                        <Content padder>
                            <Content style={styles.RestaurantImage}>
                                <Localimage source={logos[this.state.id]} originalWidth={1024} originalHeight={576} />
                            </Content>
                        </Content>


                         <TouchableOpacity onPress={() => this.props.navigation.navigate("ManagerRequests")}>
                         <Card style={{  marginRight:12,marginLeft: 12 }}>
                                <Image source={require('../images/request.png')} style={{ width: 50, height: 50, alignSelf: 'center', margin: 8 }} />
                                <Text style={{ alignSelf: 'center', marginBottom: 8 }}>Requests</Text>
                            </Card>
                          </TouchableOpacity>
                        

                        <View style={{ flexDirection: 'row' }}>
                        
                            <Card style={{ width: 120, marginLeft: 12 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("WorkerList",{id:this.state.id})}>
                                <Image source={require('../images/waiters.png')} style={{ width: 120, height: 120, alignSelf: 'center', margin: 8 }} />
                                <Text style={{ alignSelf: 'center', marginBottom: 8 }}>Workers</Text>
                                </TouchableOpacity>
                            </Card>

                            <Card style={{ width: 120, marginRight: 12 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageTables",{id:1})}>
                                <Image source={require('../images/table-icon.png')} style={{ width: 120, height: 120, alignSelf: 'center', margin: 8 }} />
                                <Text style={{ alignSelf: 'center', marginBottom: 8 }}>Tables</Text>
                                </TouchableOpacity>
                            </Card>

                        </View>

                        <Image source={require('../images/menu.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 8 }} />
                        <Button
                                warning
                                style={{ alignSelf: 'center', justifyContent: 'center', width: 300, marginBottom: 8 }}
                                onPress={() => this.props.navigation.navigate("AddNewList",{id:this.state.id})}
                            >
                                <Text>Add New List to the menu</Text>
                            </Button>
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
