import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            savedPlans: null,
            plan: null,
        }
    }

    componentDidMount () {
        this.getPlans();
    }

    getPlans = () => {
        fetch(`http://150.128.169.21:3000/plans/getPlans`, {
            method: 'GET',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }).then(response => response.json())
            .then(plans => {
                this.setState({
                    savedPlans: plans,
                })
            })
            .catch(error => {console.log(error)});
    }

    renderLoading = () => {
        return(
            <View>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    updatePlan = () => {
        const url = `http://150.128.169.21:3000/plans/modifyPlan/${this.state.usuarioLogeado}`;
        fetch(url, {
            method: 'PUT'
        }).then(respuesta => respuesta.json())
            .then(msj => console.log(msj));
    }

};

const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    button: {
    }
});