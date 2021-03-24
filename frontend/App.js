import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {creatStackNavigator} from 'react-navigation-stack';

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

const AppNavigator = creatStackNavigator({
    Home: {
        screen: HomeScreens
    },
    Register: {
        screen: RegisterScreen
    }
});

export default createAppContainer(AppNavigator);
