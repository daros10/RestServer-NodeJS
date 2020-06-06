const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificaToeknImg } = require('../middlewares/autenticacion');
const app = express();

app.get('/imagen/:tipo/:img', verificaToeknImg, (req, res) => {
    let tipo = req.params.tipo;
    let imagen = req.params.img;

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${imagen}`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let pathNoImage = path.resolve(__dirname, '../assets/no-image.jpg');

        res.sendFile(pathNoImage);
    }
});

module.exports = app;