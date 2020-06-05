//Configuracion globales del server 
require('./config/config');

// express
const express = require('express');

// para conectarse con mongo 
const mongoose = require('mongoose');

// necesario para obtener el path correcto de despliegue 
const path = require('path');

const app = express();

// body parser para leer paramteros de la url en una peticion
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public para desplegar la pagina web
app.use(express.static(path.resolve(__dirname, '../public')));

// En ves de llamar a cada ruta, se genera un archivo index 
// que contiene todas las rutas, para de esta forma tener 
// un codigo mas limpio
// app.use(require('./routes/login'));
// app.use(require('./routes/usuario'));
app.use(require('./routes/index'));

// conexion con mongo, si no existe la base no importar, se crea en la inseccion 
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('*** Base de datos ONLINE');
    }
});

// listen de nuestro server 
app.listen(process.env.PORT, () => {
    console.log(`*** Escuchando el puerto ${process.env.PORT}`);
});