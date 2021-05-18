import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            user: null,
            usuario: '',
            nombreUsuario:'',
            apellidosUsuario:'',
            correo:'',
            passwordUsuario: props.navigation.state.params.password,
            plan:'',
        }
    }

    componentDidMount () {
        this.getUser();
    }

    getUser = () => {
        fetch(`http://192.168.1.40:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(user => {
                this.setState({
                    user: user,
                    usuario: user.usuario,
                    nombreUsuario: user.nombreUsuario,
                    apellidosUsuario: user.apellidosUsuario,
                    correo: user.correo,
                    password: user.password,
                    plan: user.plan
                })
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
                    <Text>Correo</Text>
                    <TextInput
                        placeholder={user.correo}
                        onChangeText={correo => this.setState({correo: correo})}></TextInput>
                </View>
                <View style={[StyleSheet.row, {
                    marginBottom: 20
                }]}>
                    <Text>Plan</Text>
                    <TextInput
                        placeholder={user.plan}
                        editable={false}></TextInput>
                    <Button style={styles.button} color={"#C66012"} title='Cambiar plan' onPress={() => {this.changePlan()}}></Button>
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
        const url = `http://192.168.1.40:3000/users/modifyUser/${this.state.usuarioLogeado}`;
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
