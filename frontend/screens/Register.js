import React, {Component} from 'react';
import {Container, Content, Footer, Form, Header, Input, Item, Button, Text} from 'native-base';
import { AsyncStorage } from 'react-native';
import {NetworkInfo} from 'react-native-network-info';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import { AppLoading } from "expo/build/removed.web"; // miarar porque da error

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            usuario:'',
            nombre:'',
            apellidos:'',
            correo:'',
            password:'',
            alergias:'',
            intolerancias:'',
            planName:'',
            fechaNacimiento:'',
            ip:''
        };
    }

    //url = new URL('http://192.168.0.24:3000/users/newUser/');
    Register = () => {
        const {usuario}= this.state;
        const {nombre} = this.state;
        const {apellidos} = this.state;
        const {correo} = this.state;
        const {password} = this.state;
        const {alergias} = this.state;
        const {intolerancias} = this.state;
        const planName = "Gratuito";
        const {fechaNacimiento} = this.state;

        console.log(`http://192.168.1.38:3000/users/newUser/${this.state.usuario}/${this.state.nombre}/${this.state.apellidos}/${this.state.correo}/${this.state.password}/${this.state.alergias}/${this.state.intolerancias}/${planName}/${this.state.fechaNacimiento}`)

        console.log(usuario, nombre, apellidos, correo, password, alergias, intolerancias, planName, fechaNacimiento);
        const url = `http://192.168.1.38:3000/users/newUser`;

        fetch(url,{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                usuario:usuario,
                nombre:nombre,
                apellidos:apellidos,
                correo:correo,
                password:password,
                alergias:alergias,
                intolerancias:intolerancias,
                planName:planName,
                fechaNacimiento:fechaNacimiento
            })
        }).then(respuesta => respuesta.json())
            .then(responseJson => {
                if (responseJson._id === 0) {
                    alert(responseJson.error.message);
                }
                else {
                    alert("Usuario creado");
                    this.props.navigation.navigate('Login');
                }
                })
            .catch(error => {console.log(error)})
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({isReady: true});
    }

    render() {
       /* if (!this.state.isReady){
            return <AppLoading />
        }*/

        return (
            <Container>
                <Header />
                <Content padder>
                    <Form>
                        <Item>
                            <Input placeholder="Username" onChangeText={usuario => this.setState({usuario})} />
                        </Item>
                        <Item>
                            <Input placeholder="Nombre" onChangeText={nombre => this.setState({nombre})} />
                        </Item>
                        <Item>
                            <Input placeholder="Apellidos" onChangeText={apellidos => this.setState({apellidos})} />
                        </Item>
                        <Item>
                            <Input placeholder="Correo" onChangeText={correo => this.setState({correo})} />
                        </Item>
                        <Item>
                            <Input placeholder="Password" secureTextEntry={true} onChangeText={password => this.setState({password})} />
                        </Item>
                        <Item>
                            <Input placeholder="Alergias" onChangeText={alergias => this.setState({alergias})} />
                        </Item>
                        <Item>
                            <Input placeholder="Intolerancias" onChangeText={intolerancias => this.setState({intolerancias})} />
                        </Item>
                        {/*<Item>
                            <Input placeholder="PlanName" value={"Gratuito"} disabled/>
                        </Item>*/}
                        <Item>
                            <Input placeholder="Fecha Nacimiento {mm/dd/aaaa}" onChangeText={fechaNacimiento => this.setState({fechaNacimiento})} />
                        </Item>
                        <Text></Text>
                        <Button full warning color={"#C66012"} onPress={() => {this.Register()}} >
                            <Text>Registrar</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer />
            </Container>
        );
    }
}
