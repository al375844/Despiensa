import React, {Component} from 'react';
import {Container, Content, Footer, Form, Header, Input, Item, Button, Text} from 'native-base';
import { AsyncStorage } from 'react-native'
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
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
            fechaNacimiento:''
        };
    }

    /*Register = () => {
        const {usuario}= this.state;
        const {nombre} = this.state;
        const {apellidos} = this.state;
        const {correo} = this.state;
        const {password} = this.state;
        const {alergias} = this.state;
        const {intolerancias} = this.state;
        const {planName} = this.state;
        const {fechaNacimiento} = this.state;

        fetch('/users/newUser/:usuario/:nombre/:apellidos/:correo/:password/:alergias/:intolerancias/:planName/:fechaNacimiento',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
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
        }).then((respuesta) => respuesta.json())
            .then((responseJson) => {alert(responseJson)})
            .catch((error) => {console.log(error)})
    }*/

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
                            <Input placeholder="Username" onChageText={usuario => this.setState({usuario})} />
                        </Item>
                        <Item>
                            <Input placeholder="Nombre" onChageText={nombre => this.setState({nombre})} />
                        </Item>
                        <Item>
                            <Input placeholder="Apellidos" onChageText={apellidos => this.setState({apellidos})} />
                        </Item>
                        <Item>
                            <Input placeholder="Correo" onChageText={correo => this.setState({correo})} />
                        </Item>
                        <Item>
                            <Input placeholder="Password" onChageText={password => this.setState({password})} />
                        </Item>
                        <Item>
                            <Input placeholder="Alergias" onChageText={alergias => this.setState({alergias})} />
                        </Item>
                        <Item>
                            <Input placeholder="Intolerancias" onChageText={intolerancias => this.setState({intolerancias})} />
                        </Item>
                        <Item>
                            <Input placeholder="PlanName" onChageText={planName => this.setState({planName})} disabled />
                        </Item>
                        <Item>
                            <Input placeholder="Fecha Nacimiento" onChageText={fechaNacimiento => this.setState({fechaNacimiento})} />
                        </Item>
                        <Text></Text>
                        <Button full warning color={"#C66012"} /*onPress={this.Register}*/ >
                            <Text>Registrar</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer />
            </Container>
        );
    }
}
