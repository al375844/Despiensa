import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            nombrePerfil: props.navigation.state.params.perfil,
            user: null,
            usuario: '',
            nombreUsuario:'',
            apellidosUsuario:'',
            fechaNacimiento:'',
            alergias:'',
            intolerancias:'',
        }
    }

    componentDidMount () {
        this.getProfile();
    }

    getProfile = () => {
        console.log(`http://${ipv4}:3000/profiles/getProfile/${this.state.usuarioLogeado}/${this.state.nombrePerfil}`);
        fetch(`http://${ipv4}:3000/profiles/getProfile/${this.state.usuarioLogeado}/${this.state.nombrePerfil}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(user => {
                console.log(user);
            })
            .catch(error => {console.log(error)});
    }

    renderEditProfile = (user) => {
        return(
            <View style={styles.view}>
                <View>
                    <Text>Nombre</Text>
                    <TextInput
                        placeholder={user.nombreUsuario}
                        onChangeText={nombre => this.setState({nombreUsuario: nombre})}></TextInput>
                </View>
                <View>
                    <Text>Apellidos</Text>
                    <TextInput
                        placeholder={user.apellidosUsuario}
                        onChangeText={apellidos => this.setState({apellidosUsuario: apellidos})}></TextInput>
                </View>
                <View>
                    <Text>Fecha Nacimiento</Text>
                    <TextInput style={styles.input} placeholder="mes/dia/a??o" onChangeText={fechaNacimiento => user.fechaNacimiento = fechaNacimiento}></TextInput>
                </View>
                <View>
                    <Text>Alergias</Text>
                    <TextInput style={styles.input} onChangeText={alergias => user.alergias = alergias}></TextInput>
                </View>
                <View>
                    <Text>Intolerancias</Text>
                    <TextInput style={styles.input} onChangeText={intolerancias => user.intolerancias = intolerancias}></TextInput>
                </View>
                <View>
                    <Button style={styles.button} title='Guardar' onPress={() => {this.updateProfile()}}></Button>
                </View>
            </View>
        );
    }

    renderLoading = () => {
        return(
            <View>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    changePlan = () => {
        this.props.navigation.navigate('ChangePlan', {usuario: this.state.usuario, password: this.state.passwordUsuario, plan:this.state.plan});
    }

    updateProfile = () => {
        const url = `http://${ipv4}:3000/users/modifyUser/${this.state.usuarioLogeado}`;
        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                usuarioNuevo:this.state.usuario,
                nombre:this.state.nombreUsuario,
                apellidos:this.state.apellidosUsuario,
                correo:this.state.correo,
                password:this.state.passwordUsuario
            })
        }).then(respuesta => respuesta.json())
            .then(msj => console.log(msj))
            .then(this.props.navigation.navigate('Profile', {usuario: this.state.usuario, password:this.state.passwordUsuario}));
    }

    render() {
        const user = this.state.user;
        return(
            <View>
                {/* Comprobamos que user no sea null */}
                {user ?
                    this.renderEditProfile(user) :
                    this.renderLoading}
            </View>
        );
    }
};


const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    button: {
    }
});
