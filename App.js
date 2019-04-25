import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Home from "./src/pages/Home";


const AppNavigator = createStackNavigator({
  Home: Home
});
export default createAppContainer(AppNavigator);