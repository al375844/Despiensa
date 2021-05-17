import React, {Component} from "react";
import {Picker} from '@react-native-picker/picker';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario: props.navigation.state.params.passwordUsuario,
            actualPlan: props.navigation.state.params.actualPlan,
            savedPlans: undefined,
            planName: undefined,
        }
    }

    componentDidMount () {
        setTimeout(() => {
            this.getPlans();
        }, 3000);

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

    setPlan = (plan) => {
        this.setState({
            planName: plan
        })
    }

    renderChangePlan = () => {

        const width_proportion = '100%';

        console.log(this.state.planName);

        return(
            <View style={styles.view}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.planName}
                        style={{ height: 20, width: width_proportion }}
                        onValueChange={(itemValue) => this.setPlan(itemValue)}
                    >
                        {this.state.savedPlans.map(obj =>
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
        const planName = this.state.planName;
        console.log(planName)
        const password = this.state.passwordUsuario;
        const url = `http://150.128.169.21:3000/plans/modifyPlan/${this.state.usuarioLogeado}`;

        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                planName:planName,
                password:password,

            })
        }).then(respuesta => respuesta.json())
            .then(responseJson => {
                if (responseJson._id === 0) {
                    alert(responseJson.error.message);
                }
                else {
                    alert("Plan cambiado");
                    this.props.navigation.navigate('Edit', {usuario: this.state.usuarioLogeado, password:this.state.passwordUsuario});
                }
            })
            .catch(error => {console.log(error)})
    }

};

const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    button: {
    }
});
