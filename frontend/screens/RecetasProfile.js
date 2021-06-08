import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native';
import {
    Text,
} from 'react-native-paper';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario:props.navigation.state.params.password,
            user: null,
            perfiles: '',
        }
    }

    componentDidMount () {
        this.getUser();
    }

    getUser = () => {
        const passwordUsuario = this.state.passwordUsuario;
        console.log(this.state.usuarioLogeado);
        fetch(`http://${ipv4}:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(user => {
                this.setState({
                    user: user,
                    perfiles: user.perfiles
                })
            })
            .catch(error => {console.log(error)});
    }

    renderProfileScreen = (user) => {
        return (
            <SafeAreaView style={StyleSheet.container}>
                <View style={StyleSheet.userInterfaceStyle}>
                    <View style={{flexDirection: 'column', marginTop: 15, marginBottom: 20, marginLeft:10, marginRight:10}}>
                        <View style={{flexDirection: 'row', marginBottom: 10, width: '100%'}}>
                            <View style={{flexDirection: 'column', width: '50%'}}>
                                <Text style={{fontWeight: "bold", marginBottom: 10}}>Lista de Recetas</Text>
                            </View>
                            <View style={{flexDirection: 'column', width: '50%'}}>
                                <Button color={"#0099ff"} title='Crear' onPress={() => {this.props.navigation.navigate('CreateProfile', {usuario: this.state.usuarioLogeado, password : this.state.passwordUsuario })}}></Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', backgroundColor: "#DCDCDC", borderColor: "#000000", borderWidth: 2}}>
                            <View>{this.getRecetas(user)}</View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    renderLoading = () => {
        return(
            <View>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    confirmDelete() {
        Alert.alert(
            '¿Seguro que quiere borrar?',
            'Una vez realizada la acción no podra volver atras.',
            [
                {
                    text: 'Cancelar', onPress: () => console.log('Borrado cancelado'), style: 'cancel',
                },
                {
                    text: 'Aceptar', onPress: () => {this.delete(); console.log('Borrando')}
                }
            ]
        );
    }

    delete = () => {
        const passwordUsuario = this.state.passwordUsuario;
        fetch(`http://${ipv4}:3000/users/deleteUser/${this.state.usuarioLogeado}`, {
            method: 'DELETE',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                password:passwordUsuario
            })
        }).then(response => response.json())
            .then(this.props.navigation.navigate('Home'))
            .catch(error => {console.log(error)});
    }

    getRecetas = (user) => {
        return user.recetas.map(data => {
            return <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                    <View style={{margin: 10}}>
                        <Text>{data}</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'row', marginBottom: 10}}>
                    <View style={[StyleSheet.row, {
                        marginLeft: 20,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#52b788"} title='Editar' onPress={() => {this.props.navigation.navigate('Edit', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#d00000"} title='Borrar' onPress={() => this.confirmDeleteUsuario()}></Button>
                    </View>
                </View>
            </View>
        })
    }

    render() {
        const user = this.state.user;
        return(
            <View>
                {/* Comprobamos que user no sea null */}
                {user ?
                    this.renderProfileScreen(user) :
                    this.renderLoading}
            </View>
        );
    };
}
