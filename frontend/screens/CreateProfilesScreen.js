import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

import ProfileForm from './../components/ProfileForm';

class CreateProfilesScreen extends Component {
    constructor() {
        super();
        this.state = {
            numberOfUsers: null,
            confirmed: false,
            profilesData: [],
            textInputDisableStatus: true
        }
    }

    getProfilesData(profile) {
        this.setState({profilesData: this.state.profilesData.concat(profile)});
        console.log(this.state.profilesData);
    }

    renderForms() {
        if(this.state.confirmed) {
            const number = parseInt(this.state.numberOfUsers);
            const forms = []
            for (let i=0; i < number; i++) {
                forms.push(
                <ProfileForm getProfilesData={this.getProfilesData.bind(this)} profileNumber={i+1} key={"profile_"+i}></ProfileForm>
                );
            }
            return forms;
        }
    }

    if(confirmed) {
        console.log("Suuuuuu");
    };

    render() {
        return(
            <ScrollView>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.view}>
                <View>
                    <Text>¿CUANTOS PERFILES QUIERES CREAR?</Text>
                    <TextInput style={styles.input} keyboardType='numeric' onChangeText={numberOfUsers => this.setState({numberOfUsers})} editable={this.state.textInputDisableStatus}></TextInput>
                    <Button title='Confirmar' onPress={() => {this.setState({confirmed: true, textInputDisableStatus: false})}}></Button>
                </View>
                <View>
                    {this.renderForms()}
                </View>
                <View style={styles.btn}>
                    {this.state.confirmed ?
                        <Button title='Crear perfiles' onPress={() => console.log(this.state.profilesData)}></Button> : <Text></Text>}
                </View>
            </View>
            </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        padding: '10%'
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: 300
    },

    btn: {
        marginTop: 20
    }
});

export default CreateProfilesScreen;