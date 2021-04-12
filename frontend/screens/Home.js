import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

export default class Aboutscreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Logearse para empezar a usar la aplicación</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Login')}
                    title='Login'
                    color="#841584"
                    accessibilityLabel="Learn more"
                />
            </View>
        )
    }
}
