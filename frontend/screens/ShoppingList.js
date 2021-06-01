import React, {useState} from 'react';
import {Alert, StyleSheet, RefreshControl} from 'react-native';
import {
    Body,
    Container,
    Content,
    Right,
    Text,
    CheckBox,
    List,
    ListItem,
    Fab,
    Icon
} from 'native-base';
import {Title} from "react-native-paper";
import AlertInput from "react-native-alert-input";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioLogeado: props.navigation.state.params.usuario,
            passwordUsuario: props.navigation.state.params.password,
            nombreLista: props.navigation.state.params.nombreLista,
            products: [],
            nombreProducto: '',
            cantidad: '',
            show: false
        };
    }

    /*** Render ***/
    render() {
        return (
            <Container>
                <Content>
                    <Title style={[StyleSheet.row, {
                        marginLeft: 25,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center'
                    }]}>{this.state.nombreLista}</Title>
                    <List>
                        {
                            this.state.products.map(p => {
                                    return (
                                        <ListItem
                                            key={p.id}
                                            onPress={this._handleProductPress.bind(this, p)}
                                        >
                                            <Body>
                                                <Text style={{ color: p.gotten ? '#bbb' : '#000' }}>
                                                    {p.nombre}
                                                </Text>
                                            </Body>
                                            <Right>
                                                <Text style={{ color: p.gotten ? '#bbb' : '#000' }}>
                                                    {p.cantidad}
                                                </Text>
                                            </Right>
                                        </ListItem>
                                    );
                                }
                            )}
                    </List>
                </Content>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({show: true})}
                >
                    <Icon name="add" />
                </Fab>
                <AlertInput
                    show={this.state.show}
                    title={"Añadir producto y cantidad"}
                    cancelText={"Cancelar"}
                    onCancel={()=>{this.setState({show: false})}}
                    cancelStyle={[StyleSheet.row, {
                        backgroundColor: "#ff3451",
                    }]}

                    submitText={"Añadir"}
                    onSubmit={(text)=>{this.addProduct(text)}}
                    submitStyle={[StyleSheet.row, {
                        backgroundColor: "#a5ff16",
                    }]}

                    inputStyle={[StyleSheet.row, {
                        color: "#000000",
                    }]}
                    num={2}
                />
                <Fab
                    style={{ backgroundColor: 'red' }}
                    position="bottomLeft"
                    onPress={this._handleClearPress.bind(this)}
                >
                    <Icon ios="ios-remove" android="md-remove" />
                </Fab>
            </Container>
        );
    }

    _handleProductPress(product) {
        this.state.products.forEach(p => {
            if (product.id === p.id) {
                p.gotten = !p.gotten;
            }
            return p;
        });

        this.setState({ products: this.state.products });
    }

    addProduct(product) {
        let nombre = product[0]
        let cantidad = product[1]
        console.log(nombre, cantidad, this.state.nombreLista, this.state.usuarioLogeado)

        this.state.products.push({nombre, cantidad})
        console.log(this.state.products)

        fetch(`http://192.168.1.38:3000/lists/addFood/${this.state.usuarioLogeado}`, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                nombreLista:this.state.nombreLista,
                nombreAlimento:nombre,
                cantidad:cantidad
            })
        }).then(response => response.json())
            .then(setTimeout(() => {
                this.setState({time: true, show: false})
            }, 1000))
            .catch(error => {console.log(error)});
    }

    _handleAddProductPress() {
        this.props.navigation.navigate('AddProduct', {
            addProduct: product => {
                this.setState({
                    products: this.state.products.concat(product)
                });
            },
            deleteProduct: product => {
                this.setState({
                    products: this.state.products.filter(p => p.id !== product.id)
                });
            },
            productsInList: this.state.products
        });
    }

    _handleClearPress() {
        Alert.alert('Clear all items?', null, [
            { text: 'Cancel' },
            { text: 'Ok', onPress: () => this.setState({ products: [] }) }
        ]);
    }
}