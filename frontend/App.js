import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import RegisterScreen from './user/Register'

class HomeScreens extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Despiensa</Text>
            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreens
    },
    Register: {
        screen: RegisterScreen
    }
});

export default createAppContainer(AppNavigator);
