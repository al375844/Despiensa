import React, {useState} from 'react';
import prompt from 'react-native-prompt-android';
import {AsyncStorage, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import AlertInput from "react-native-alert-input";
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
import {Alert, View} from "react-native";

export default class App extends React.Component {
    static navigationOptions = {
        title: 'Add a product'
    };

    constructor(props) {
        super(props);
        this.state = {
            allProducts: [
                { id: 1, name: 'Pan' },
                { id: 2, name: 'Huevos' },
                { id: 3, name: 'Chuletas de cerdo' },
                { id: 4, name: 'Zumo de naranja' }
            ],
            productsInList: [],
            nombreProducto: '',
            cantidad: '',
            show: false
        };
    }

    async UNSAFE_componentWillMount() {
        const savedProducts = await AsyncStorage.getItem('@allProducts');
        if(savedProducts) {
            this.setState({
                allProducts: JSON.parse(savedProducts)
            });
        }

        this.setState({
            productsInList: this.props.navigation.state.params.productsInList
        });
    }

    async addNewProduct(name) {
        const newProductsList = this.state.allProducts.concat({
            name: name,
            id: Math.floor(Math.random() * 100000)
        });

        await AsyncStorage.setItem(
            '@allProducts',
            JSON.stringify(newProductsList)
        );

        this.setState({
            allProducts: newProductsList
        });
    }

    _handleProductPress(product) {
        const productIndex = this.state.productsInList.findIndex(
            p => p.id === product.id
        );
        if (productIndex > -1) {
            this.setState({
                productsInList: this.state.productsInList.filter(
                    p => p.id !== product.id
                )
            });
            this.props.navigation.state.params.deleteProduct(product);
        } else {
            this.setState({
                productsInList: this.state.productsInList.concat(product)
            });
            this.props.navigation.state.params.addProduct(product);
        }
    }

    _handleAddProductPress = () => {
        /*return (
            <Container>
                <Content>
                    <Dialog.Container visible={true}>
                        {console.log("Dentro")}
                        <Dialog.Title>Añadir producto</Dialog.Title>
                        <Dialog.Input
                            label={"Nombre Producto"}
                            onChangeText={producto => this.setState({nombreProducto: producto})}>
                        </Dialog.Input>
                        <Dialog.Input
                            label={"Cantidad"}
                            onChangeText={cant => this.setState({canridad: cant})}>
                        </Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={() => console.log("Cancelado")}/>
                        <Dialog.Button label="Ok" onPress={() => console.log(this.state.nombreProducto, this.state.cantidad)}/>
                    </Dialog.Container>
                </Content>
            </Container>
        );*/
        /*prompt(
            'Enter product name',
            '',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: this.addNewProduct.bind(this) }
            ],
            {
                type: 'plain-text'
            }
        );*/
    }

    async _handleRemovePress(product) {
        this.setState({
            allProducts: this.state.allProducts.filter(p => p.id !== product.id)
        });
        await AsyncStorage.setItem(
            '@allProducts',
            JSON.stringify(
                this.state.allProducts.filter(p => p.id !== product.id)
            )
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.state.allProducts.map(product => {
                            const productIsInList = this.state.productsInList.
                            find(p => p.id === product.id);
                            return (
                                <ListItem
                                    key={product.id}
                                    onPress={this._handleProductPress.bind
                                    (this, product)}
                                >
                                    <Body>
                                        <Text
                                            style={{ color: productIsInList? '#bbb' : '#000' }}
                                        >
                                            {product.name}
                                        </Text>
                                        {
                                            productIsInList &&
                                            <Text note>
                                                {'Already in shopping list'}
                                            </Text>
                                        }
                                    </Body>
                                    <Right>
                                        <Icon
                                            ios="ios-remove-circle"
                                            android="md-remove-circle"
                                            style={{ color: 'red' }}
                                            onPress={this._handleRemovePress.bind(this, product)}
                                        />
                                    </Right>
                                </ListItem>
                            );
                        })}
                    </List>
                </Content>
                <Fab
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({show: true})}
                >
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }

   /* _handleAddProductPress() {
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
    }*/

}
