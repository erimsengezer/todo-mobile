import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,  createMaterialTopTabNavigator } from "react-navigation";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";


const AppNavigator = createStackNavigator({
  Login: Login,
  Register: Register
});
export default createAppContainer(AppNavigator);