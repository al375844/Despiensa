//node core dependencies
const path = require('path');

//3rd party dependencies
const express = require('express');

//Exportamos nuestra conexión a MongoDB (que es una función)
const mongoConnect = require('./utils/database').mongoConnect;

//creamos una aplicación express y la guardamos en app (en express se ha guardado una función, que ejecutamos ahora)
const app = express();

//guardamos en rootDir el path al directorio base, en el que se encuentra app.js
const rootDir = require('../src/utils/path');

//rutas a usar
const usersRoutes = require('./routes/usersRoutes');
const profilesRoutes = require('./routes/profilesRoutes')

//app.use recibe un o varias funciones y las ejecuta para cada petición.

//le proporcionamos a express las rutas que nosotros mismos creamos
app.use('/users', usersRoutes);
app.use('/profiles', profilesRoutes);

//Servimos utilizando express, los archivos css de forma estática
app.use(express.static( path.join(rootDir, 'public') ));

//Página home
app.use('/home', (req, res, next) => {
    console.log('In another middleware.');
    res.sendFile( path.join(rootDir, 'views', 'home.html') );
});

//Página 404
app.use((req,res,next) => {
    res.status(404).sendFile( path.join(rootDir, 'views', 'notFound.html') );
})

//Ejecutamos la función exportada de database.js
mongoConnect(() => {
    app.listen(3000); //Solo queremos que express se inicie si nos conectaoms a la base de datos con éxito.
})