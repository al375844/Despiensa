import React from "react";
import {AppLoading} from "expo/build/removed.web";
import {Header, Text, Input, Item, Content, Container, Form, Footer, Button} from "native-base";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            user: null,
            usuario:'',
            password:'',
            passwordBack:''
        };
    }

    Login = () => {
        const {usuario} = this.state;
        console.log(usuario)
        const {password} = this.state;
        console.log(password)
        let passwordBack;
        let respuesta;

        fetch(`http://150.128.172.133:3000/users/getUser/${this.state.usuario}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(respuesta => respuesta.json())
            .then(user => {
                this.setState({
                    user: user,
                    passwordBack: user.password,
                })
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
        return (
            <Container>
                <Header/>
                <Content padder>
                    <Form>
                        <Item>
                            <Input placeholder={"Username"} onChangeText={usuario => this.setState({usuario})}/>
                        </Item>
                        <Item>
                            <Input placeholder={"Password"} onChangeText={password => this.setState({password})}/>
                        </Item>
                        <Text></Text>
                        <Button full warning onPress={this.Login}>
                            <Text>Entrar</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer/>
            </Container>
        );
    }
}
