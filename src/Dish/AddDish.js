import React from "react";
import { StatusBar, Image, StyleSheet, ImageBackground, View } from "react-native";
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
  Form,
  Item,
  Label,
  Input,
} from "native-base";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class AddDish extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          textInput : []
        }
      }

      addTextInput = (key) => {
        let textInput = this.state.textInput;
        textInput.push(<Item>
            <Input key={key} placeholder='Size' />
          </Item>);
        this.setState({ textInput })
      }

  render() {
    return (
      <Container>
        <ImageBackground source={require('../images/background2.jpg')} style={{ flex: 1, width: '100%', height: '100%' }}>


          <Content padder>

            <Image source={require('../images/plus.png')} style={{ width: 100, height: 100, alignSelf: 'center',}} />

            <View >
              <Form style={styles.signForm}>
                <Item>
                  <Input placeholder='List name' />
                </Item>

                <Button
                  warning
                  style={{ alignSelf: 'center', justifyContent: 'center', width: 180, marginTop: 20, marginBottom: 20 }}
                  onPress={() => this.props.navigation.navigate("")}
                >
                  <Text>Add New List</Text>
                </Button>

                 <Button onPress={() => this.addTextInput(this.state.textInput.length)} >
                 <Text>+</Text>
                 </Button>
        {this.state.textInput.map((value, index) => {
          return value
        })}

              </Form>


            </View>




          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  signForm: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  }
});

