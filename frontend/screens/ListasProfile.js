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
        fetch(`http://192.168.1.199:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
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
                        <Text style={{fontWeight: "bold"}}>Listas</Text>
                        <Text>{this.getListas(user)}</Text>
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
        fetch(`http://192.168.1.199:3000/users/deleteUser/${this.state.usuarioLogeado}`, {
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

    getListas = (user) => {
        return user.listas.map(data => {
            return <ScrollView style={{marginBottom: 5}}>
                <View style={{marginLeft: 10, marginTop: 5, backgroundColor: "#99ccff"}}>
                    <Text>{data.nombreLista}</Text>
                    <Text style={{fontWeight: "bold", marginTop: 5}}>Alimentos</Text>
                    <Text>{this.getAlimentos(data.alimentos)}</Text>
                </View>
                <View style={[StyleSheet.row, {
                    marginLeft: 25,
                    marginTop: 10
                }]}>
                    <Button color={"#52b788"} title='Editar' onPress={() => {this.props.navigation.navigate('Edit', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                </View>
                <View style={[StyleSheet.row, {
                    marginLeft: 15,
                    marginTop: 10
                }]}>
                    <Button color={"#d00000"} title='Borrar' onPress={() => this.confirmDelete()}></Button>
                </View>
            </ScrollView>
        })
    }

    getAlimentos = (alimentos) => {
        return alimentos.map(data => {
            return <View>
                <Text>Alimento: {data.alimento}</Text>
                <Text>Cantidad: {data.cantidad}</Text>
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