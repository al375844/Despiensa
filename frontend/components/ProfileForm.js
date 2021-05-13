import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, } from 'react-native'


const ProfileForm = props => {
    const [color, setColor] = useState('#2196F3');
    const [disabled, setDisable] = useState(false);

    const user = {
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        alergias: '',
        intolerancias: '',
    }

    const handlerPress = () => {
        props.getProfilesData(user);
        setColor('#3fd053');
        setDisable(true);
    }

    return(
        <View style={styles.card}>
            <Text style={styles.profileTitle}>Perfil {props.profileNumber}</Text>
            <View>
                <Text>Nombre</Text>
                <TextInput style={styles.input} onChangeText={nombre => user.nombre = nombre}></TextInput>
            </View>
            <View>
                <Text>Apellidos</Text>
                <TextInput style={styles.input} onChangeText={apellidos => user.apellidos = apellidos}></TextInput>
            </View>
            <View>
                <Text>Fecha Nacimiento</Text>
                <TextInput style={styles.input} placeholder="mes/dia/año" onChangeText={fechaNacimiento => user.fechaNacimiento = fechaNacimiento}></TextInput>
            </View>
            <View>
                <Text>Alergias</Text>
                <TextInput style={styles.input} onChangeText={alergias => user.alergias = alergias}></TextInput>
            </View>
            <View>
                <Text>Intolerancias</Text>
                <TextInput style={styles.input} onChangeText={intolerancias => user.intolerancias = intolerancias}></TextInput>
            </View>
            <View>
                <Button title='Confirmar Perfil' disabled={disabled} color={color} onPress={handlerPress}></Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 7,
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
    },

    profileTitle: {
        textAlign: 'center',
        fontSize: 18
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        width: 300
    }
});


export default ProfileForm;