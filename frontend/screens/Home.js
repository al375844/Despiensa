import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

export default class Aboutscreen extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View>
                    <Text style={styles.title}>Welcome to Despiensa!</Text>
                </View>

                
                <Text>¿Ya tienes una cuenta?</Text>
                

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button block style={styles.buttonLogin}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonLoginText}>Sign In</Text>
                    </Button>
                </View>
                    
                <Text>¿Todavia no estás registrado?</Text>

                <View>
                    <Button block style={styles.buttonRegister}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonRegisterText}>Sign up</Text>
                    </Button>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        color: '#246EE9',
        marginTop: 30,
        marginBottom: 80,
        textAlign: 'center'
    },

    buttonLogin: {
        backgroundColor: '#246EE9',
        padding: 140,
        margin: 10,
        borderRadius: 50,
        elevation: 0
    },

    buttonLoginText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },

    buttonRegister: {
        backgroundColor: '#FFFFFF',
        padding: 140,
        margin: 10,
        borderRadius: 50,
        borderColor: '#246EE9',
        borderWidth: 1,
        elevation: 0
    },

    buttonRegisterText: {
        color: '#246EE9',
        fontWeight: 'bold'
    }
});