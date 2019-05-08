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
import TodoStore from './TodoStore';

const initialState = {
  title: '',
  detail: '',
}

const width = Dimensions.get("window").width;

export default class App extends Component{
  
  static navigationOptions = {
    swipeEnabled: false,
    header: null 
   
};
  
  state = initialState;


  render() {
    const {todos} = TodoStore
    const { navigation } = this.props;
    const todo = navigation.getParam('todo');
    return (
      <View style={styles.container}>
        <Text>Detail: {todo.title} </Text>
        <Text>Detail: {todo.detail} </Text>
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
});
