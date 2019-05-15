import React, {Component} from 'react';
import {
        Platform, 
        StyleSheet, 
        Text, 
        View,
        Dimensions,
        Button,
        Image
      
      } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const width = Dimensions.get("window").width;
export default class App extends Component{
  
  static navigationOptions = {
    swipeEnabled: false,
    header: null 
   
};
  
  constructor(props) {
    super(props);
    this.state = { 
      
      passIsFocused: false,
      onFocus: false

    };
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.data.name}</Text>
    

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
      backgroundColor: 'gray',
      
  }
  
});
