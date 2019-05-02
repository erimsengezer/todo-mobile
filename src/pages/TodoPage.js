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
    title: ''
}

const width = Dimensions.get("window").width;
export default class App extends Component{
  
  static navigationOptions = {
    swipeEnabled: false,
    header: null 
   
};
  
  state = initialState

  onChangeText(key, value) {
      this.setState({
          [key]: value
      })
  }
  
  addTodo(){
      TodoStore.addTodo(this.state)
      this.setState(initialState)
  }



  render() {
      const {todos} = TodoStore
    return (
      <View style={styles.container}>
        <TextInput
            style={styles.inputStyle}
            value={this.state.title}
            onChangeText={value => this.onChangeText('title', value)}
        />
        <Button onPress={this.addTodo.bind(this)} title='Add Todo'/>
        
        {
            todos.map((todo, index) => <Text key={index}>{todo.title}</Text>)
        }

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
  inputStyle: {
    backgroundColor: 'gray',
    width: width,
    padding: 5
  },
});
