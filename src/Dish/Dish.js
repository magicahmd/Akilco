import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground,TouchableOpacity,View,Alert } from "react-native";
import {Button,Text,Container,Card,CardItem,Body,Content,Header,Title,Left,Icon,Right,Item,Input} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
      name: this.props.navigation.state.params.name,
      count:1,
      itemPrice:10,
      totalPrice: 0,
      checked: 0,

    }
  }

  getdata() {
    return fetch('http://10.0.0.7/Akilco/public/api/Dish/'+this.state.id+'/sizes')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson, itemPrice: responseJson[0].pivot.price, totalPrice: responseJson[0].pivot.price, isLoading:false });
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {

    this.getdata();
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

renderSizes(){
  return dishData.map((item, key) => {

    
    return(

<CardItem>
{this.state.checked == key ?
  <TouchableOpacity style={{ flexDirection: 'row' }}>
    <Image style={{ width: 25, height: 25, marginRight:6 }} source={require('../images/filledButton.png')} />
    <Text>{item.name} : ₪{item.pivot.price}</Text>
  </TouchableOpacity>
  :
  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { this.setState({ checked: key, itemPrice: dishData[key].pivot.price, totalPrice: dishData[key].pivot.price, count:1 });}}>
    <Image style={{ width: 25, height: 25, marginRight:6 }} source={require('../images/unfilledButton.png')} />
    <Text>{item.name} : ₪{item.pivot.price}</Text>
  </TouchableOpacity>
}
</CardItem>
      );
  });
 
  
}
      
    

  render() {

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

    dishData = this.state.data;
    
    return (
      <Container>
         <ImageBackground source={require('../images/background2.jpg')}  style={{flex:1,width:'100%',height:'100%'}}>

        <Content padder>

        <Card>
            <CardItem>

              <Left>
              <Text style={{fontWeight:'bold'}}>{this.state.name}</Text>
              </Left>

              <Right>
              <Text style={{fontSize:15, color:'black'}}>₪ {this.state.itemPrice}</Text>
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
              <Text style={{fontWeight:'bold'}}>Size:</Text>
              </Left>

            </CardItem>

                        {this.renderSizes()}

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

            <CardItem>
            <Body>
            <Button
             warning
            style={{alignSelf:'center',justifyContent:'center' ,width:200, marginTop: 4, marginBottom: 8}}
            onPress={() => this.props.navigation.navigate("")}>
            <Text>إضافة إلى الطلب</Text>
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
