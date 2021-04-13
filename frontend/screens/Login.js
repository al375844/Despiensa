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
        };
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
                            <Input placeholder={"Username"}/>
                        </Item>
                        <Item>
                            <Input placeholder={"Password"} />
                        </Item>
                        <Text></Text>
                        <Button full warning>
                            <Text>Entrar</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer/>
            </Container>
        );
    }
}
