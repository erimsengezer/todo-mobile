import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,  createMaterialTopTabNavigator } from "react-navigation";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Todo from "./src/pages/TodoPage";
import Detail from "./src/pages/DetailTodo";


const AppNavigator = createStackNavigator({
  Home: Todo,
  Detail: Detail,
  Login: Login,
  Register: Register,
});
export default createAppContainer(AppNavigator);