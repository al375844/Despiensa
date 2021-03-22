//node core dependencies
const path = require('path');

//3rd party dependencies
const express = require('express');

//creamos una aplicación express y la guardamos en app (en express se ha guardado una función, que ejecutamos ahora)
const app = express();

//rutas a usar
const usersRoutes = require('../src/routes/usersRoutes');

//app.use recibe un o varias funciones y las ejecuta para cada petición.

app.use('/users', usersRoutes);

app.use('/home', (req, res, next) => {
    console.log('In another middleware.');
    res.send('<h1>Hello from Despiensa!</h1>');
});

app.use((req,res,next) => {
    res.status(404).sendFile( path.join(__dirname, 'views', 'notFound.html') );
})

app.listen(3000);