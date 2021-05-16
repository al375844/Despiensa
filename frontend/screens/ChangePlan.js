import React, {Component} from "react";
import {Picker} from '@react-native-picker/picker';
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
        fetch(`http://192.168.1.110:3000/plans/getPlans`, {
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

    setPlan = (plan) => {
        this.setState({
            planName: plan
        })
    }

    renderChangePlan = () => {

        const width_proportion = '100%';

        const {savedPlans} = this.state;
        setTimeout(() => {
            this.setPlan(savedPlans[0].nombre);
        }, 1000);

        return(
            <View style={styles.view}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.planName}
                        style={{ height: 20, width: width_proportion }}
                        onValueChange={(itemValue) => this.setPlan(itemValue)}
                    >
                        {savedPlans.map(obj =>
                            {
                                return (<Picker.Item label={obj.nombre} value={obj.nombre}/>)
                            }
                        )}
                    </Picker>
                </View>
                <View style={[StyleSheet.row, {
                    marginTop: 40
                }]}>
                    <Button style={styles.button} title='Cambiar plan' onPress={() => {this.updatePlan()}}></Button>
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
        const url = `http://192.168.1.110:3000/plans/modifyPlan/${this.state.usuarioLogeado}`;
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
