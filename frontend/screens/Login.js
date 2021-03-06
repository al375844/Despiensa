import React from "react";
import {AppLoading} from "expo/build/removed.web";
import {Header, Text, Input, Item, Content, Container, Form, Footer, Button} from "native-base";
import {Ionicons} from '@expo/vector-icons';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            user: null,
            usuario:'',
            password:''
        };
    }

    Login = () => {
        const {usuario} = this.state;
        const {password} = this.state;

        fetch(`http://${ipv4}:3000/users/getUser/${this.state.usuario}/${this.state.password}`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(respuesta => respuesta.json())
            .then(user => {
                if (user.password === password){
                    this.props.navigation.navigate('Profile', {usuario: this.state.usuario, password:this.state.password });
                }
                else {
                    alert("Contraseña incorrecta");
                }
            })
            .catch(error => {console.log(error)})


    }

    async componentDidMount() {
        console.log(ipv4);
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
                            <Input placeholder={"Password"} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
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
