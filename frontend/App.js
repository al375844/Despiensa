import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ProfileScreen from "./screens/Profile";
import EditProfileScreen from "./screens/EditProfileScreen"
import ChangePlanScreen from "./screens/ChangePlan"
import CreateProfilesScreen from "./screens/CreateProfilesScreen"

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
  },
  Profile: {
    screen: ProfileScreen
  },
  Edit: {
    screen: EditProfileScreen
  },
  ChangePlan: {
    screen: ChangePlanScreen
  },
  CreateProfiles: {
    screen: CreateProfilesScreen
  }
});

export default createAppContainer(AppNavigator);
