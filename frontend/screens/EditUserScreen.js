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
            savedPlans:undefined,
        }
    }

    componentDidMount () {
        this.getUser();
    }

    getUser = () => {
        let user_aux;
        fetch(`http://${ipv4}:3000/users/getUser/${this.state.usuarioLogeado}/${this.state.passwordUsuario}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(user => {
                user_aux = user;
                this.setState({
                    user: user,
                    usuario: user.usuario,
                    nombreUsuario: user.nombreUsuario,
                    apellidosUsuario: user.apellidosUsuario,
                    correo: user.correo,
                    password: user.password,
                })
            })
            .catch(error => {console.log(error)});

        fetch(`http://${ipv4}:3000/plans/getPlans`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(plans => {
                let plan_number;
                for (const plan in plans) {
                    if(user_aux.plan == plans[plan]._id){
                        console.log(plans[plan].nombre);
                        plan_number = plan;
                        break;
                    }
                }
                this.setState({
                    savedPlans: plans,
                    plan: plans[plan_number].nombre,
                })
            })
            .catch(error => {console.log(error)});


    }

    renderEditProfile = (user) => {
        console.log("Plan: " + this.state.plan);
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
                        placeholder={this.state.plan}
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
        console.log(this.state.savedPlans);

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
