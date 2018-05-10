import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground,TouchableOpacity,View,Alert } from "react-native";
import {Button,Text,Container,Card,CardItem,Body,Content,Header,Title,Left,Icon,Right,Item,Input} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import URL from '../URLs'

export default class EditPreOrder extends React.Component {

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
      waiters:[],
      id: this.props.navigation.state.params.id,
      restaurant_id: this.props.navigation.state.params.restaurant_id,
      checked: 0,
      assigned_waiter: null,


    }
  }

  getdata() {
    url = URL.getTable(this.state.id)
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ data: responseJson });
        })
        .catch((error) => {
            console.error(error);
        });
}

getRestaurantWaiters(){
    url = URL.getRestaurantWaiters(this.state.restaurant_id);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ waiters: responseJson, isLoading:false });

        if(this.state.waiters!=null){
          this.state.assigned_waiter = this.state.waiters[0].id;
        }
       
      


      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderWaiters(){
    return waiters.map((item, key) => {
      
      return(
  
        <CardItem>
        {this.state.checked == key ?
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Image style={{ width: 25, height: 25, marginRight:6 }} source={require('../images/filledButton.png')} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this.setState({ checked: key, assigned_waiter: item.id });}}>
            <Image style={{ width: 25, height: 25, marginRight:6 }} source={require('../images/unfilledButton.png')} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        }
        </CardItem>

        );
    });
   
    
  }

  update(){
      url = URL.assign_waiter(this.state.id);
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worker_id: this.state.assigned_waiter,
        }),
      });
      
        alert('The table has been edited.');
        this.props.navigation.goBack('');
  }

  delete_table(){
    url = URL.delete_table(this.state.id);
      fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
      alert('The table has been deleted.');
      this.props.navigation.goBack('');
    
    }

  componentWillMount() {
    
  this.getdata();
  this.getRestaurantWaiters();

  }

      
    

  render() {

    waiters = this.state.waiters;

    if(this.state.isLoading){
      return(
          <Container>
      <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>
      
        <Content>
        <Image source={require('../images/loading-icon.gif')} style={{alignSelf:'center', marginTop:12, marginBottom:8}}/>
       
        </Content>
      </ImageBackground>
    </Container>

      )
  }    
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>

        <Content padder>

        <Card>
            <CardItem>

              <Left>
              <Text style={{fontWeight:'bold'}}>Table No: </Text>
              </Left>

              <Right>
              <Text style={{fontSize:15, color:'black'}}>{this.state.data.name}</Text>
              </Right>
             
            </CardItem>

          </Card>

          <Card>
            <CardItem>

              <Left>
              <Text style={{fontWeight:'bold'}}>Seats No: </Text>
              </Left>

              <Right>
              <Text style={{fontSize:15, color:'black'}}>{this.state.data.seats_no}</Text>
              </Right>
             
            </CardItem>
                    

            </Card>

          <Card>


            <CardItem>
            <Body>

            <CardItem>

              <Left>
              <Text style={{fontWeight:'bold'}}>Waiters:</Text>
              </Left>

            </CardItem>
            
             {this.renderWaiters()}


             
                
            <Button
             warning
            style={{alignSelf:'center',justifyContent:'center' ,width:200, marginTop: 4}}
            onPress={() => this.update()}>
            <Text>Update</Text>
             </Button>

              <Button
             warning
            style={{alignSelf:'center',justifyContent:'center' ,width:200, marginTop: 4}}
            onPress={() =>{
              this.state.assigned_waiter=null;
              this.update();
            }}>
            <Text>No waiter</Text>
             </Button>

             <Button
             danger
            style={{alignSelf:'center',justifyContent:'center' ,width:200, marginTop: 4}}
            onPress={() => this.delete_table()}>
            <Text>Delete this table.</Text>
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
  HomeContent:{
    marginTop: 70,
    marginLeft: 8,
    marginRight:8, 
    minHeight: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6, 
  },

});
