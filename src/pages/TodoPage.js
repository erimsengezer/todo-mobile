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
        Animated,
        ListView,
        RefreshControl
      
      } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import TodoStore from './TodoStore';
import { observable } from 'mobx';
import axios from 'react-native-axios';

import Task from '../components/Task';

const initialState = {
    title: '',
    detail: '',
    check: false,
    isSwiping: false,
    refreshing: false,
    data: [],
    token: [],
    error: "",
    animated: new Animated.Value(0),
}

const width = Dimensions.get("window").width;


export default class TodoPage extends Component{

  static navigationOptions = {
    swipeEnabled: false,
    header: null,
    gesturesEnabled: false,
    
};
  
  state = initialState
  
  componentDidMount(){
    axios.post(
      'https://mcucen-todoappapi.herokuapp.com/oauth/token',
      {
        'username': 'erimsengezer@gmail.com',
        'password': '123123',
        'grant_type': 'password',
        'client_secret': 'qsRhvkyyY6XqIqlSwSdK3iC83XFapDUDGNocLlER',
        'client_id': '2',
        'scope': '*'
      }
    ).then(response => this.setState({token: response.data}))
    .catch(error => console.log(error))
  }

  getData(){
     const token = this.state.token.access_token
     console.log(token)

    axios.get('https://mcucen-todoappapi.herokuapp.com/api/todos',
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'token_type': 'Bearer'
      }
    }
    )
    .then(response => this.setState({data: response.data.data}))
    .catch(error => console.log(error))
  }

  onRefresh(){
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

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
    TodoStore.completedTodo(todo)
    this.setState(initialState)
  }
  swipe() {
    this.setState({check: !this.state.check});
    Animated.timing(this.state.animated, {
      toValue: 1,
      duration: 600,
      delay: 400
    }).start();
     
  }
  
  renderData(){
    this.getData();
    return this.state.data.map((items, Id) =>
      <Task key={Id} data={items} />
    )
  }



  render() {
        const leftContent = 
          <View style={styles.completeButton}>
              <Image 
                source={ require('../images/check.png') } 
                style={{width:30, height:30}} 
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
      <TouchableOpacity
          style={
            (this.state.token.access_token != null) ? 
            {
              backgroundColor: "blue",
              padding: 10,
              width: width/4,
              alignItems: "center"
            }:
            {
              opacity: 0
            }
          }
        >
          <Text style={{color:'white'}}>Button</Text>
      </TouchableOpacity>
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
        <Button onPress={() =>this.props.navigation.navigate('Completed')} title='Completed Todo'/>
        
                    
        <ScrollView
          horizontal={false}
          directionalLockEnabled={true}
          contentContainerStyle={{width: width}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
          >
          {
            this.getData()
          }
           {
            this.state.data.map((items, Id) =>
              <Task key={Id} data={items} />
            )
          }
          {/* {
            getTodos.map((todo, index) =>
                  <Swipeable 
                    style={
                      (todo.read) ? 
                      {
                        opacity: 0
                      }:
                      {
                        width: width-10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        borderBottomWidth: 0.4,
                        borderBottomColor: '#147efb',
                        marginTop: 10,
                        padding:0,
                        justifyContent: 'center',
                      }
                    } 
                    leftContent={leftContent} 
                    rightButtons={rightButtons} 
                    onRightActionRelease={() => this.removeTodo(todo)}
                    onLeftActionRelease={() => this.completed(todo)}
                    >
                    <View style={{flexDirection:'row', alignItems:'center'}}>

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
                            marginLeft: width/2-20
                          }
                          :
                          {
                            opacity: 0
                          }
                        }
                    />
                    </View>
                  </Swipeable>
            )
          } */}
          {
            this.state.data.map((items, index) =>
                  <Swipeable 
                    style={
                      {
                        width: width-10,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        borderBottomWidth: 0.4,
                        borderBottomColor: '#147efb',
                        marginTop: 10,
                        padding:0,
                        justifyContent: 'center',
                      }
                    } 
                    leftContent={leftContent} 
                    rightButtons={rightButtons} 
                    onRightActionRelease={() => this.removeTodo(todo)}
                    onLeftActionRelease={() => this.completed(todo)}
                    >
                    <View style={{flexDirection:'row', alignItems:'center'}}>

                    <TouchableOpacity style={{margin: 20}} onPress={() => this.props.navigation.navigate('Detail', {todo:todo})}>
                      <Text key={index}>Title: {items.name}</Text>
                      {/* <Text key={index}>{todo.read ? 'yes' : 'no'}</Text> */}
                    </TouchableOpacity>
                    </View>
                  </Swipeable>
                    )
          }
        </ScrollView>
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
    marginRight: 10,
    alignItems: 'flex-end',
  },
  scroll: {
    width: width
  }
});
