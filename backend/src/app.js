//node core dependencies
//const http = require('http');

//3rd party dependencies
const express = require('express');

//creamos una aplicación express y la guardamos en app (en express se ha guardado una función, que ejecutamos ahora)
const app = express();

//app.use recibe un o varias funciones y las ejecuta para cada petición.
app.use('/', (req, res, next) => {
    console.log('This allways runs!');
    next();
});
app.use('/add-product', (req, res, next) => {
    console.log('In one middleware.');
    res.send('<h1>The "add-product" page</h1>');
});
app.use('/', (req, res, next) => {
    console.log('In another middleware.');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);