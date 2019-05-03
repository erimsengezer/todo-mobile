import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,  createMaterialTopTabNavigator } from "react-navigation";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Todo from "./src/pages/TodoPage";
import Detail from "./src/pages/DetailTodo";


const AppNavigator = createStackNavigator({
  Login: Login,
  Register: Register,
  Home: Todo,
  Detail: Detail,
});
export default createAppContainer(AppNavigator);