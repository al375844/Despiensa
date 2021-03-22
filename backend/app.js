//node core dependencies
const http = require('http');

//3rd party dependencies
const express = require('express');

//creamos una aplicación express y la guardamos en app (en express se ha guardado una función, que ejecutamos ahora)
const app = express();

const server = http.createServer(app);

server.listen(3000);