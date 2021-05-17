import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, ScrollView, Button, Alert} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import styleToBarStyle from "expo-status-bar/build/styleToBarStyle";
import {Container} from "native-base";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario:props.navigation.state.params.password,
            user: null,
            usuario: '',
            nombreUsuario:'',
            apellidosUsuario:'',
            correo:'',
            plan:'',
            puntuacionUsuario:'',
            n_recetas: '',
            perfiles: '',
            listas: '',
            recetas: '',
            despensa: '',
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
                    usuario: user.usuario,
                    nombreUsuario: user.nombreUsuario,
                    apellidosUsuario: user.apellidosUsuario,
                    correo: user.correo,
                    plan: user.plan,
                    puntuacionUsuario: user.puntuacionUsuario,
                    n_recetas: user.n_recetas,
                    perfiles: user.perfiles,
                    listas: user.listas,
                    recetas: user.recetas,
                    despensa: user.despensa
                })
            })
            .catch(error => {console.log(error)});
    }

    renderProfileScreen = (user) => {
        return (
            <SafeAreaView style={StyleSheet.container}>
                <View style={StyleSheet.userInterfaceStyle}>
                    <View style={{flexDirection: 'row',marginTop: 15, marginLeft: 5}}>
                        <Avatar.Image
                            source={{uri: 'https://bysperfeccionoral.com/wp-content/uploads/2020/01/136-1366211_group-of-10-guys-login-user-icon-png.jpg',
                            }}
                            size={80}
                        />
                        <View style={{marginLeft: 20}}>
                            <Title style={[StyleSheet.title, {
                                marginTop:15,
                                marginBottom: 5,
                            }]}>{user.nombreUsuario} {user.apellidosUsuario}</Title>
                            <Caption style={StyleSheet.caption}>{user.correo}</Caption>
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
                            <Button color={"#d00000"} title='Borrar' onPress={() => this.confirmDeleteUsuario()}></Button>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[StyleSheet.row, {
                        marginTop: 20,
                        marginLeft: 15
                    }]}>
                        <Text style={{fontWeight: "bold"}}>Nombre de usuario</Text>
                        <Text>{user.nombreUsuario}</Text>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginTop: 20,
                        marginLeft: 15
                    }]}>
                        <Text style={{fontWeight: "bold"}}>Puntuación usuario</Text>
                        <Text>{user.puntuacionUsuario}</Text>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginTop: 20,
                        marginLeft: 15
                    }]}>
                        <Text style={{fontWeight: "bold"}}>Numero recetas</Text>
                        <Text>{user.n_recetas}</Text>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 10
                    }]}>
                        <Button color={"#0099ff"} title='Perfiles' onPress={() => {this.props.navigation.navigate('Friends', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 10
                    }]}>
                        <Button color={"#0099ff"} title='Listas' onPress={() => {this.props.navigation.navigate('Listas', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 10
                    }]}>
                        <Button color={"#0099ff"} title='Despensa' onPress={() => {this.props.navigation.navigate('Despensa', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 10
                    }]}>
                        <Button color={"#0099ff"} title='Recetas' onPress={() => {this.props.navigation.navigate('Recetas', {usuario: this.state.usuario, password : this.state.passwordUsuario })}}></Button>
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

    confirmDeleteUsuario() {
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

    deleteUsuario = () => {
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
            return <ScrollView style={{marginBottom: 5}}>
                <View style={{marginLeft: 10, marginTop: 5, backgroundColor: "#99ccff"}}>
                    <Text>{data.nombrePerfil} {data.apellidosPerfil}</Text>
                    <Text>{data.fechaNacimientoPerfil}</Text>
                    <Text style={{fontWeight: "bold", marginTop: 5}}>Alergias</Text>
                    <Text>{this.getAlergias(data.alergias)}</Text>
                    <Text style={{fontWeight: "bold", marginTop: 5}}>Intolerancias</Text>
                    <Text>{this.getIntolerancias(data.intolerancias)}</Text>
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

    getListas = (user) => {
        return user.listas.map(data => {
            return <ScrollView style={{marginBottom: 5}}>
                <View style={{marginLeft: 10, marginTop: 5, backgroundColor: "#99ccff"}}>
                    <Text>{data.nombreLista}</Text>
                    <Text style={{fontWeight: "bold", marginTop: 5}}>Alimentos</Text>
                    <Text>{this.getAlimentos(data.alimentos)}</Text>
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

    getDespensa = (user) => {
        return user.despensa.map(data => {
            return <View>
                <Text>Alimento: {data.alimento}</Text>
                <Text>Cantidad: {data.cantidad}</Text>
            </View>
        })
    }

    getRecetas = (user) => {
        return user.recetas.map(data => {
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
