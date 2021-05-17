import React, {Component} from "react";
//import RNPickerSelect from "react-native-picker-select";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            actualPlan: props.navigation.state.params.actualPlan,
            savedPlans: undefined,
            planName: undefined,
        }
    }

    componentDidMount () {
        this.getPlans();
    }

    getPlans = () => {
        fetch(`http://192.168.0.24:3000/plans/getPlans`, {
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
            .catch(error => {console.log(error); console.log('Peto al obtener planes')});
    }

    renderChangePlan = () => {

        const items = this.state.savedPlans.map(obj => (
            {
                label: obj.nombre,
                value: obj.nombre,
            }
        ));

        console.log('Termino con items');
        console.log(items);


        return(
            <View style={styles.view}>
                <View style={styles.container}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecciona un plan...',
                            value: null,
                        }}
                        onValueChange={(value) => {this.setState({
                            planName: value,
                        });}}
                        items={items}
                        value={this.state.planName}
                    ></RNPickerSelect>
                </View>
                <View style={[StyleSheet.row, {
                    marginTop: 40
                }]}>
                    <Button style={styles.button} title='Cambiar plan' ></Button>
                </View>
            </View>
        );
    }

    render() {
        const savedPlans = this.state.savedPlans;
        return(
            <View>
                {/* Comprobamos que savedPlans no sea null */}
                {savedPlans ?
                    this.renderChangePlan() :
                    this.renderLoading()}
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

    updatePlan = () => {
        const url = `http://192.168.0.24:3000/plans/modifyPlan/${this.state.usuarioLogeado}`;
        fetch(url, {
            method: 'PUT'
        }).then(respuesta => respuesta.json())
            .then(msj => {console.log(msj); console.log('Peto al intentar cambiar plan');});
    }

};

const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    button: {
    }
});
