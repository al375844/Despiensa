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
        fetch(`http://192.168.1.55:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
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
                    <View style={[StyleSheet.row, {
                        marginTop: 20,
                        marginLeft: 15
                    }]}>
                        <Text style={{fontWeight: "bold", marginBottom: 10}}>Perfiles</Text>
                        <Text>{this.getPerfiles(user)}</Text>
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

    confirmDeleteFriend() {
        Alert.alert(
            '¿Seguro que quiere borrar?',
            'Una vez realizada la acción no podra volver atras.',
            [
                {
                    text: 'Cancelar', onPress: () => console.log('Borrado cancelado'), style: 'cancel',
                },
                {
                    text: 'Aceptar', onPress: () => {this.deleteUsuario(); console.log('Borrando')}
                }
            ]
        );
    }

    deleteFriend = () => {
        const passwordUsuario = this.state.passwordUsuario;
        fetch(`http://192.168.1.55:3000/users/deleteUser/${this.state.usuarioLogeado}`, {
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

    getPerfiles = (user) => {
        return user.perfiles.map(data => {
            return <ScrollView>
                <View style={{marginLeft: 10, backgroundColor: "#DCDCDC", borderColor: "#000000", borderWidth: 2}}>
                    <View style={{margin: 10}}>
                        <Text>{data.nombrePerfil} {data.apellidosPerfil}</Text>
                        <Text>{data.fechaNacimientoPerfil}</Text>
                        <Text style={{fontWeight: "bold", marginTop: 5}}>Alergias</Text>
                        <Text>{this.getAlergias(data.alergias)}</Text>
                        <Text style={{fontWeight: "bold", marginTop: 5}}>Intolerancias</Text>
                        <Text>{this.getIntolerancias(data.intolerancias)}</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#0099ff"} title='Crear' onPress={() => {this.props.navigation.navigate('Edit', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
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
            </ScrollView>
        })
    }

    getAlergias = (alergias) => {
        return alergias.map(data => {
            return <Text>{data}</Text>
        })
    }

    getIntolerancias = (intolerancias) => {
        return intolerancias.map(data => {
            return <Text>{data}</Text>
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
