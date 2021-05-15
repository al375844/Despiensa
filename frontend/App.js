import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';

class HomeScreens extends React.Component {
  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: ' center'}}>
          <Text>Despiensa</Text>
        </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
});

export default createAppContainer(AppNavigator);
