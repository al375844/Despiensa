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

    componentWillUnmount () {
        clearTimeout()
    }

    getUser = () => {
        const passwordUsuario = this.state.passwordUsuario;
        console.log(this.state.usuarioLogeado);
        fetch(`http://192.168.1.129:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
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
                                <Text style={{fontWeight: "bold", marginBottom: 10}}>Listas de la compra</Text>
                            </View>
                            <View style={{flexDirection: 'column', width: '50%'}}>
                                <Button color={"#0099ff"} title='Crear' onPress={() => this.setState({showCreate: true})}></Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', backgroundColor: "#DCDCDC", borderColor: "#000000", borderWidth: 2, paddingBottom: 10}}>
                            <View>{this.getListas(user)}</View>
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
        const url = `http://192.168.1.38:3000/lists/deleteList/${this.state.usuarioLogeado}`;

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
            //.then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .then(setTimeout(this.getUser.bind(this), 100))
            .catch(error => {console.log(error)});
    }

    confirmEditList(nuevoNombreLista, nombreLista) {
        const url = `http://192.168.1.129:3000/lists/updateList/${this.state.usuarioLogeado}`;

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
            //.then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .then(this.setState({showEdit:false}))
            .then(setTimeout(this.getUser.bind(this), 100))
            .catch(error => {console.log(error)});
    }

    //{borderColor: "#000000", borderWidth: 2, marginTop: 15}

    getListas = (user) => {
        return user.listas.map(data => {
            return <View style={{flexDirection: 'column'}}>

                <View style={{flexDirection: 'row', marginLeft: 10}}>
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
                            backgroundColor: "#d00000",
                        }]}

                        submitText={"Cambiar"}
                        onSubmit={(text)=>{this.confirmEditList(text, data.nombreLista)}}
                        submitStyle={[StyleSheet.row, {
                            backgroundColor: "#52b788",
                        }]}

                        inputStyle={[StyleSheet.row, {
                            color: "#000000",
                        }]}

                        style={[StyleSheet.row, {
                            marginTop: 0,
                        }]}
                    />
                </View>
                <View style = {{flexDirection: 'row', marginBottom: 10}}>
                    <View style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        alignItems: 'center'
                    }]}>
                        <Button color={"#0099ff"} title='Añadir productos' onPress={() => {this.props.navigation.navigate('ShoppingList', {usuario: this.state.usuarioLogeado, password : this.state.passwordUsuario,  nombreLista: data.nombreLista})}}></Button>
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

            </View>
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
                    height: '100%'
                }]}>
                <AlertInput
                    show={this.state.showCreate}
                    title={"Nombre de la lista"}
                    cancelText={"Cancelar"}
                    onCancel={()=>{this.setState({showCreate: false})}}
                    cancelStyle={[StyleSheet.row, {
                        backgroundColor: "#d00000",
                    }]}

                    submitText={"Añadir"}
                    onSubmit={(text)=>{this.createList(text)}}
                    submitStyle={[StyleSheet.row, {
                        backgroundColor: "#52b788",
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
        const url = `http://192.168.1.129:3000/lists/newList/${this.state.usuarioLogeado}/${nombreLista}`;
        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            //.then(this.props.navigation.navigate('Profile', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario}))
            .then(this.setState({showCreate:false}))
            .then(setTimeout(this.getUser.bind(this), 100))
            .catch(error => {console.log(error)});
    }
}
