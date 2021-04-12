import React from "react";
import {AppLoading} from "expo/build/removed.web";
import {Header, Text, Input, Item, Content, Container, Form, Footer} from "native-base";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
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
                    </Form>
                </Content>
                <Footer/>
            </Container>
        );
    }
}
