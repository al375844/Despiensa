import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

 fetch('http://192.168.0.24:3000/users/getUser/pacoelcocinas24', {
    method: 'GET',
    headers:{
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
    }
}).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {console.log(error)});

class EditProfileScrren extends Component {
    render() {
        return(
            <View style={styles.view}>
                <View>
                    <Text>Nombre</Text>
                    <TextInput placeholder='Paco'></TextInput>
                </View>
                <View>
                    <Text>Correo</Text>
                    <TextInput placeholder='paco@prueba'></TextInput>
                </View>
                <View>
                    <Text>Nombre</Text>
                    <TextInput placeholder='Paco'></TextInput>
                </View>
                <View>
                    <Text>Nombre</Text>
                    <TextInput placeholder='Paco'></TextInput>
                </View>
                <View>
                    <Text>{}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        padding: '10%'
    }
});

export default EditProfileScrren;