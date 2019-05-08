import React, {Component} from 'react';
import {
        Platform, 
        StyleSheet, 
        Text, 
        View,
        Dimensions,
        Button,
        Image,
        TouchableHighlight,
        Animated
      
      } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import TodoStore from './TodoStore';
import { observable } from 'mobx';

const initialState = {
    title: '',
    detail: '',
    check: false,
    animated: new Animated.Value(0),
}

const width = Dimensions.get("window").width;


export default class TodoPage extends Component{
  
  static navigationOptions = {
    swipeEnabled: false,
    header: null,
    gesturesEnabled: false 
};
  
  state = initialState

  onChangeText(key, value) {
      this.setState({
          [key]: value
      })
  }
  onChangeTextDesc(key, value) {
      this.setState({
          [key]: value
      })
  }
  
  addTodo(){
      Animated.timing(this.state.animated).stop()
      TodoStore.addTodo(this.state)
      this.setState(initialState)
  }
  removeTodo(todo){
    TodoStore.removeTodo(todo)
    this.setState(initialState)
    // alert("delete")
  }
  completed(todo){
    todo.completedTodo()
    

  }
  toggleRead(todo){
    todo.toggleRead()
  }
  swipe() {
    this.setState({check: !this.state.check});
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 600,
      delay: 400
    }).start();
     
  }



  render() {
        const leftContent = 
          <View style={styles.completeButton}>
              <Image 
                source={ require('../images/check.png') } 
                style={{width:30, height:30,}} 
              />
          </View>;
        const rightButtons = [
            <TouchableHighlight style={styles.deleteButton}>
                <Image 
                    source= {require('../images/trash.png')}
                    style={{width:30, height:30, marginLeft:10,}}
                />
                
            </TouchableHighlight>,
        ];
      
        
        const {todos,getTodos} = TodoStore
    return ( 
      <View style={styles.container}>
        <TextInput
            style={styles.titleInput}
            placeholder={"Title"} 
            value={this.state.title}
            onChangeText={value => this.onChangeText('title', value)}
        />
        <TextInput
            style={styles.descInput} 
            value={this.state.detail}
            placeholder={"Description"} 
            onChangeText={value => this.onChangeTextDesc('detail', value)}
        />
        <Button onPress={this.addTodo.bind(this)} title='Add Todo'/>

          {
            getTodos.map((todo, index) =>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  transform: [
                    {
                      translateX: this.state.animated.interpolate({
                        inputRange: [0,1],
                        outputRange: [1,width]
                      })
                    }
                  ]
                }}
              >
                <Swipeable 
                  style={styles.swipeableStyle} 
                  leftContent={leftContent} 
                  rightButtons={rightButtons} 
                  onRightActionRelease={() => this.removeTodo(todo)}
                  onLeftActionRelease={() => todo.completed}
                  >
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                  {/* <TouchableOpacity
                    style=
                    {
                      (this.state.check) ?
                      {
                        backgroundColor: '#438BFF',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }:
                      {
                        backgroundColor: '#fff',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#000',
                          marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                      }
                    }
                    onPress={() => this.swipe()}
                  >
                    <Image 
                      source={require('../images/checkIconWhite.png')}
                      style={
                        (this.state.check) ? 
                        {
                          width: 10,
                          height: 10
                        }:
                        {
                          opacity: 0
                        }
                      }
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity style={{margin: 20}} onPress={() => this.props.navigation.navigate('Detail', {todo:todo})}>
                    <Text key={index}>Title: {todo.title}</Text>
                    <Text key={index}>{todo.read ? 'yes' : 'no'}</Text>
                  </TouchableOpacity>
                  <Image 
                    source={require('../images/check.png')}
                    style=
                    {
                      (todo.read) ?
                      {
                        width: 30,
                        height: 30,
                      }
                      :
                      {
                        opacity: 0
                      }
                    }
                  />
                  </View>
                    {/* <Text 
                        onPress={() => this.toggleRead(todo)} 
                        key={index}> {todo.read ? 'Yes' : 'No'}
                    </Text> */}
                </Swipeable>
              </Animated.View>
            )
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
    marginTop: 50
  },
  titleInput: {
    width: width-20,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#147efb',
    borderRadius:   5,
    padding: 10,
    paddingVertical: 15,
  },
  descInput:{
    width: width-20,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#147efb',
    borderRadius:   5,
    marginTop: 20,
    padding: 10,
    paddingVertical: 15,
    
  },
  component: {
      width: width-30,
      marginTop: 10,
      padding: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
  },
  swipeableStyle:{
      width: width-10,
      marginLeft: 10,
      marginRight: 10,
      borderBottomWidth: 0.4,
      borderBottomColor: '#147efb',
      marginTop: 10,
      padding:0,
      justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6157',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  completeButton: {
    backgroundColor: '#48E700',
    justifyContent: 'center',
    flex: 1,
    paddingRight: 20,
    marginRight: 2,
    alignItems: 'flex-end',
  },
});
