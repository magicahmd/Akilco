import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import URL from '../URLs'

export default class SitOnTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      checked: 0,
      restaurant_id: this.props.navigation.state.params.restaurant_id,
      user_id: this.props.navigation.state.params.user_id,


    }

  }

  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,

  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  componentWillMount(){
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  reserve_table(){
    url = URL.assign_client();
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.lastScannedUrl,
        user_id: this.state.user_id,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson});
      this.check_table();
     

    });
  }

  check_table(){
    if(this.state.data==0){
      alert('This table is not available');

    }

    else{
      table = {
        id: this.state.data[0].id,
        name: this.state.data[0].name,
        restaurant_id: this.state.data[0].restaurant_id,
      }
      AsyncStorage.setItem('TABLE', JSON.stringify(table));
      alert('This table is yours!');
      this.props.navigation.navigate("Drawer");

    }
  }


  _handlePressUrl = () => {
    Alert.alert(
      'Reserve this table ?',
      'Table id: '+ this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
         // onPress: () => this.props.navigation.goBack(null),
         onPress: () => this.reserve_table(),

        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            Reserve this table
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
