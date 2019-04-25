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
  onFocus = () => {
      this.setState({passIsFocused: false})
      const onFocus = this.state.onFocus
      this.setState({ onFocus: !onFocus })
      
  }
  onFocusPass = () => {
    const onFocus = this.state.onFocus
    this.setState({ onFocus: false })
    const passIsFocused = this.state.passIsFocused
    this.setState({passIsFocused: !passIsFocused})
  }



  render() {
    return (
      <View style={styles.container}>
      <Image resizeMode="center" style={styles.logoStyle} source={require('../images/logo.png')}/>
        <TextInput
          style={
            (this.state.onFocus) ?
            {
              borderBottomColor: '#147efb', 
              borderBottomWidth: 2, 
              marginTop:20,
              width: width-20,
              height: 25,
              marginTop:30,
              padding: 5,
            }
            : {
              borderBottomColor: '#000', 
              borderBottomWidth:0.5, 
              marginTop:20,
              width: width-20,
              height: 25,
              marginTop:30,
              padding: 5
            }
          }

          placeholder={"E-mail"}
          onFocus= {() => this.onFocus()}

        />
        <TextInput
          style={(this.state.passIsFocused) ? 
          {
            borderBottomColor: '#147efb', 
            borderBottomWidth: 2, 
            marginTop: 20,
            width: width-20,
            height: 25,
            marginTop: 30,
            padding: 5
          } : 
          {
            borderBottomColor: '#000', 
            borderBottomWidth:0.5, 
            marginTop:20,
            width: width-20,
            height: 25,
            marginTop:30,
            padding: 5
          }}

          placeholder={"Password"}
          onFocus= {() => this.onFocusPass()}

        />
        
          <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

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
  logoStyle: {
    width: width-100,  
},
  buttonStyle:{
    width: width-240,
    backgroundColor: '#147efb',
    height: 30, 
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    opacity: 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  }
});
