import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
//import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Aboutscreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Registrese para empezar a usar la aplicación</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Register')}
                    title='Registro'
                    color="#841584"
                    accessibilityLabel="Learn more"
                />
            </View>
        )
    }
}
