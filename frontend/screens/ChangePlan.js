import React, {Component} from "react";
import RNPickerSelect from "react-native-picker-select";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            actualPlan: props.navigation.state.params.actualPlan,
            savedPlans: null,
            plan: null,
        }
    }

    componentDidMount () {
        this.getPlans();
        this.setState({
            plan: this.state.actualPlan
        })
    }

    getPlans = () => {
        fetch(`http://192.168.1.110:19000/plans/getPlans`, {
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

    renderChangePlan = (savedPlans) => {
        const plan = this.state.plan;

        return(
            <View style={styles.view}>
                <View style={[StyleSheet.row, {
                    marginBottom: 20
                }]}>
                    <Text>Elige un plan</Text>
                    <RNPickerSelect
                        value={plan}
                        onValueChange={(value) => this.setState({plan: value})}
                        items={this.state.savedPlans.map(obj => (
                            {
                                key: obj._id,
                                label: obj.nombre,
                                value: obj._id,
                            }
                        ))}
                    />
                </View>
                <View>
                    <Button style={styles.button} title='Cambiar plan' onPress={this.updatePlan}></Button>
                </View>
            </View>
        );
    }

    render() {
        const savedPlans = this.state.savedPlans;
        return(
            <View>
                {/* Comprobamos que user no sea null */}
                {savedPlans ?
                    this.renderChangePlan(savedPlans) :
                    this.renderLoading}
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
        const url = `http://192.168.1.110:19000/plans/modifyPlan/${this.state.usuarioLogeado}`;
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
