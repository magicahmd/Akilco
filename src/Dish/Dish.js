import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground,TouchableOpacity,View,Alert } from "react-native";
import {Button,Text,Container,Card,CardItem,Body,Content,Header,Title,Left,Icon,Right,Item,Input} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Dish extends React.Component {

  constructor(props){
    super(props);
    this.state={
       count:1,
       itemPrice:30,
       totalPrice: 30,
    }
  }

increment(){
        this.setState({
          count : this.state.count + 1,
          totalPrice : (this.state.count+1) * this.state.itemPrice
        })
}

decrement(){

  if(this.state.count>1){
    this.setState({
      count : this.state.count - 1,
      totalPrice : (this.state.count-1) * this.state.itemPrice
    })
  }
  
}
      
    

  render() {
    
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>

        <Content padder>

        <Card>
            <CardItem>

              <Left>
              <Text style={{fontSize:15, color:'black'}}>₪ {this.state.itemPrice}</Text>
              </Left>

              <Right>
                <Text style={{fontWeight:'bold'}}>اسم الطبق</Text>
              </Right>
             
            </CardItem>

            <CardItem>

            <Left/>
            <Body/>
              
              <Right>
                <Text >وصف الطبق</Text>
              </Right>
            </CardItem>
          </Card>

          <Card>
            <CardItem>

              <Left>
            <CardItem>
           
              

              <Left  style={{justifyContent:'center'}}>
              <Button danger  style={{width:45, marginRight:5, marginLeft:5, justifyContent:'center'}} onPress ={ ()=> this.increment() }><Text style={{alignSelf:'center',}}>+</Text></Button>
              <Button danger style={{width:45,justifyContent:'center'}} onPress ={ ()=> this.decrement()}><Text style={{alignSelf:'center',}}>-</Text></Button>
              <Text style={{fontSize:15, color:'black', alignSelf:'center',}}>{this.state.count}</Text>

              </Left>

              <Body>
              </Body>
              
              </CardItem>

              </Left>

              <Right>
                <Text >الكمية</Text>
              </Right>
             
            </CardItem>

            <CardItem>
              

              <Left>
              <Text style={{fontSize:15, color:'black'}}>₪ {this.state.totalPrice}</Text>
              </Left>


              <Right>
              <Text style={{fontWeight:'bold'}}>السعر</Text>
              </Right>

              

            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Left/>
              <Right>
              <Text style={{fontWeight:'bold'}}>ملاحظات</Text>
              </Right>
            </CardItem>

            <Item inlineLabel last><Input placeholder='أدخل ملاحظاتك' style={{textAlign :'right', marginRight: 10}}/></Item>
           
            
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
