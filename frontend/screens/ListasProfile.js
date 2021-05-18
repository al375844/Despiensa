import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, ScrollView, Button, Alert, RefreshControl} from 'react-native';
import {
    Text,
} from 'react-native-paper';
import AlertInput from "react-native-alert-input";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario:props.navigation.state.params.password,
            user: null,
            perfiles: '',
            showCreate: false,
            showEdit: false
        }
    }

    componentDidMount () {
        this.getUser();
    }

    getUser = () => {
        const passwordUsuario = this.state.passwordUsuario;
        console.log(this.state.usuarioLogeado);
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

    confirmDeleteList(nombreLista) {
        console.log(nombreLista)
        Alert.alert(
            '¿Seguro que quiere borrar?',
            'Una vez realizada la acción no podra volver atras.',
            [
                {
                    text: 'Cancelar', onPress: () => console.log('Borrado cancelado'), style: 'cancel',
                },
                {
                    text: 'Aceptar', onPress: () => {this.deleteList(nombreLista); console.log('Borrando')}
                }
            ]
        );
    }

    deleteList = (nombreLista) => {
        const passwordUsuario = this.state.passwordUsuario;
        const url = `http://192.168.1.40:3000/lists/deleteList/${this.state.usuarioLogeado}`;

        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                nombreLista: nombreLista
            })
        }).then(response => response.json())
            .then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .catch(error => {console.log(error)});
    }

    confirmEditList(nuevoNombreLista, nombreLista) {
        const url = `http://192.168.1.40:3000/lists/updateList/${this.state.usuarioLogeado}`;

        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                viejoNombreLista: nombreLista,
                nuevoNombreLista: nuevoNombreLista
            })
        }).then(response => response.json())
            .then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .catch(error => {console.log(error)});
    }


    getListas = (user) => {
        return user.listas.map(data => {
            return <ScrollView>
                <View style={{marginLeft: 10, backgroundColor: "#DCDCDC", borderColor: "#000000", borderWidth: 2, marginTop: 15}}>
                    <View style={{margin: 10}}>
                        <Text>{data.nombreLista}</Text>
                        <Text style={{fontWeight: "bold", marginTop: 5}}>Alimentos</Text>
                        <View>{this.getAlimentos(data.alimentos)}</View>
                    </View>
                    <AlertInput
                        show={this.state.showEdit}
                        title={"Cambiar nombre lista"}
                        cancelText={"Cancelar"}
                        onCancel={()=>{this.setState({showEdit: false})}}
                        cancelStyle={[StyleSheet.row, {
                            backgroundColor: "#ff3451",
                        }]}

                        submitText={"Añadir"}
                        onSubmit={(text)=>{this.confirmEditList(text, data.nombreLista)}}
                        submitStyle={[StyleSheet.row, {
                            backgroundColor: "#a5ff16",
                        }]}

                        inputStyle={[StyleSheet.row, {
                            color: "#000000",
                        }]}

                        style={[StyleSheet.row, {
                            marginTop: 0,
                        }]}
                    />
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#0099ff"} title='Añadir productos' onPress={() => {this.props.navigation.navigate('ShoppingList', {usuario: this.state.usuario, password : this.state.passwordUsuario,  nombreLista: data.nombreLista})}}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#52b788"} title='Editar' onPress={() => this.setState({showEdit: true})}></Button>
                    </View>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#d00000"} title='Borrar' onPress={() => this.confirmDeleteList(data.nombreLista)}></Button>
                    </View>
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
            <View
                style={[StyleSheet.row, {
                    marginTop: 10,
                    height: 1000
                }]}>
                <View>
                    <Button color={"#0099ff"} title='Crear' onPress={() => this.setState({showCreate: true})}></Button>
                </View>
                <AlertInput
                    show={this.state.showCreate}
                    title={"Nombre de la lista"}
                    cancelText={"Cancelar"}
                    onCancel={()=>{this.setState({showCreate: false})}}
                    cancelStyle={[StyleSheet.row, {
                        backgroundColor: "#ff3451",
                    }]}

                    submitText={"Añadir"}
                    onSubmit={(text)=>{this.createList(text)}}
                    submitStyle={[StyleSheet.row, {
                        backgroundColor: "#a5ff16",
                    }]}

                    inputStyle={[StyleSheet.row, {
                        color: "#000000",
                    }]}
                />
                {/* Comprobamos que user no sea null */}
                {user ?
                    this.renderProfileScreen(user) :
                    this.renderLoading}
            </View>
        );
    };

    createList(nombreLista) {
        const url = `http://192.168.1.40:3000/lists/newList/${this.state.usuarioLogeado}/${nombreLista}`;

        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .catch(error => {console.log(error)});
    }
}
