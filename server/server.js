//Configuracion globales del server 
require('./config/config');

// express
const express = require('express');

// para conectarse con mongo 
const mongoose = require('mongoose');

const app = express();

// body parser para leer paramteros de la url en una peticion
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

// conexion con mongo, si no existe la base no importar, se crea en la inseccion 
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos ONLINE');
    }
});

// listen de nuestro server 
app.listen(process.env.PORT, () => {
    console.log(`*** Escuchando el puerto ${process.env.PORT}`);
});