import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

import ProfileForm from './../components/ProfileForm';

class CreateProfilesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario: props.navigation.state.params.password,
            numberOfUsers: null,
            confirmed: false,
            profilesData: [],
            textInputDisableStatus: true

        }
    }

    //====================================
    //FUNCIONES
    //====================================
    createProfiles = () => {
        const numProfiles = this.state.profilesData.length
        for(let i=0; i<numProfiles; i++) {
            const profile = this.state.profilesData[i];
            console.log(profile, this.state.usuarioLogeado);
            fetch('http://192.168.1.38:3000/profiles/newProfile', {
                method: 'PUT',
                headers:{
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    nombre: profile.nombre,
                    apellidos: profile.apellidos,
                    alergias: profile.alergias,
                    intolerancias: profile.intolerancias,
                    usuario: this.state.usuarioLogeado,
                    fechaNacimiento: profile.fechaNacimiento
                })
            }).then(respuesta => respuesta.json()).then(msj => console.log(msj));
        }
        this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password: this.state.passwordUsuario});
    }

    getProfilesData(profile) {
        this.setState({profilesData: this.state.profilesData.concat(profile)});
        console.log(this.state.profilesData);
    }

    renderForms() {
        if(this.state.confirmed) {
            const number = parseInt(this.state.numberOfUsers);
            const forms = []
            for (let i=0; i < number; i++) {
                forms.push(
                <ProfileForm getProfilesData={this.getProfilesData.bind(this)} profileNumber={i+1} key={"profile_"+i}></ProfileForm>
                );
            }
            return forms;
        }
    }

    //====================================
    //RENDER PART
    //====================================
    render() {
        return(
            <ScrollView>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.view}>
                <View>
                    <Text>¿CUANTOS PERFILES QUIERES CREAR?</Text>
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={numberOfUsers => this.setState({numberOfUsers})} editable={this.state.textInputDisableStatus}></TextInput>
                    <Button title='Confirmar' onPress={() => {this.setState({confirmed: true, textInputDisableStatus: false})}}></Button>
                </View>
                <View>
                    {this.renderForms()}
                </View>
                <View style={styles.btn}>
                    {this.state.confirmed ?
                        <Button title='Crear perfiles' onPress={() => {this.createProfiles()}}></Button> : <Text></Text>}
                </View>
            </View>
            </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

//====================================
// STYLES
//====================================
const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: 300
    },

    btn: {
        marginTop: 20
    }
});

export default CreateProfilesScreen;
