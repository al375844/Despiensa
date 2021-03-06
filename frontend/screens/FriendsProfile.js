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
                                <Text style={{fontWeight: "bold", marginBottom: 10}}>Lista de Perfiles</Text>
                            </View>
                            <View style={{flexDirection: 'column', width: '50%'}}>
                                <Button color={"#0099ff"} title='Crear' onPress={() => {this.props.navigation.navigate('CreateProfile', {usuario: this.state.usuarioLogeado, password : this.state.passwordUsuario })}}></Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', backgroundColor: "#DCDCDC", borderColor: "#000000", borderWidth: 2}}>
                            <View>{this.getPerfiles(user)}</View>
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

    confirmDeleteFriend(nombrePerfil) {
        Alert.alert(
            '??Seguro que quiere borrar?',
            'Una vez realizada la acci??n no podra volver atras.',
            [
                {
                    text: 'Cancelar', onPress: () => console.log('Borrado cancelado'), style: 'cancel',
                },
                {
                    text: 'Aceptar', onPress: () => {this.deleteFriend(nombrePerfil); console.log('Borrando')}
                }
            ]
        );
    }

    deleteFriend = (nombrePerfil) => {
        const passwordUsuario = this.state.passwordUsuario;
        const url = `http://${ipv4}:3000/profiles/deleteProfile/${this.state.usuarioLogeado}/${nombrePerfil}`;

        console.log(url);
        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario }))
            .catch(error => {console.log(error)});
    }

    getPerfiles = (user) => {
        return user.perfiles.map(data => {
            let fechaCorrecta = new Date(data.fechaNacimientoPerfil).toLocaleDateString();
            return <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', marginLeft: 5, marginBottom: 10}}>
                    <View style={{margin: 10}}>
                        <Text>{data.nombrePerfil} {data.apellidosPerfil}</Text>
                        <Text>{fechaCorrecta}</Text>
                        <Text style={{fontWeight: "bold", marginTop: 5}}>Alergias</Text>
                        <Text>{this.getAlergias(data.alergias)}</Text>
                        <Text style={{fontWeight: "bold", marginTop: 5}}>Intolerancias</Text>
                        <Text>{this.getIntolerancias(data.intolerancias)}</Text>
                    </View>
                </View>
                <View style = {{flexDirection: 'column', marginLeft: 60}}>
                    <View style = {{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', marginTop: 10}}>
                            <Button color={"#52b788"} title='Editar' onPress={() => {this.props.navigation.navigate('EditProfile', {usuario: this.state.usuarioLogeado, perfil: data.nombrePerfil})}}></Button>
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 25, marginTop: 10}}>
                            <Button color={"#d00000"} title='Borrar' onPress={() => this.confirmDeleteFriend(data.nombrePerfil)}></Button>
                        </View>
                    </View>
                </View>
            </View>
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
