import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Global from './Global'

import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ProfileScreen from "./screens/Profile";
import EditUserScreen from "./screens/EditUserScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChangePlanScreen from "./screens/ChangePlan";
import FriendsProfile from "./screens/FriendsProfile";
import DespensaProfile from "./screens/DespensaProfile";
import ListasProfile from "./screens/ListasProfile";
import RecetasProfile from "./screens/RecetasProfile";
import CreateProfilesScreen from "./screens/CreateProfilesScreen";
import ShoppingListScreen from "./screens/ShoppingList";
import AddProductScreen from "./screens/AddProduct"


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
    screen: EditUserScreen
  },
  EditProfile: {
    screen: EditProfileScreen
  },
  ChangePlan: {
    screen: ChangePlanScreen
  },
  Friends: {
    screen: FriendsProfile
  },
  Despensa: {
    screen: DespensaProfile
  },
  Recetas: {
    screen: RecetasProfile
  },
  Listas: {
    screen: ListasProfile
  },
  CreateProfile: {
    screen: CreateProfilesScreen
  },
  ShoppingList: {
    screen: ShoppingListScreen
  },
  AddProduct: {
    screen: AddProductScreen
  }
});

export default createAppContainer(AppNavigator);
