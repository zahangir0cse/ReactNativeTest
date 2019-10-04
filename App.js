import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import InputScreen from "./src/Screens/Input";
const AppNavigator = createStackNavigator(
    {
      Home: InputScreen,
      /*Details: DetailsScreen,
      login:Login,*/
    },
    {
      initialRouteName: 'Home',
    }
);
const AppContainer = createAppContainer(AppNavigator);

export default class HelloWorldApp extends Component {
  render() {
    return <AppContainer/>;
  }
}
