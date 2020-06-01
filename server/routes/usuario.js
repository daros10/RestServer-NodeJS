const express = require('express');

// encriptar la contrasena con un hash de una solo via
const bcrypt = require('bcrypt');

// liberia underscore 
const _ = require('underscore');

const Usuario = require('../models/usuarios');

const app = express();

app.get('/usuario', function(req, res) {

    // parametros opcionales en el url para la paginacion de usuario 
    let desde = req.query.desde || 0; // si no envia el parametro se asume que desea desde el reg 0 
    desde = Number(desde);
    let limite = req.query.limite || 5; // si no envia el parametro se muestra 5 
    limite = Number(limite);

    // como segundo paramtro del find como string se puede elegir que campos mostrar 
    // entre las llaves {} se puede agregar una condicion para mostrar los registros ej: google: true
    Usuario.find({ estado: true }, 'nombre email role img estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, numReg) => {

                res.json({
                    ok: true,
                    numeroRegistros: numReg,
                    usuarios,
                })
            });


        });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // para que en la respueta no se vea el hash de la contrasena. -- aun asi se vera que existe el 
        // campo password, por lo cual se realizo un metodo en el schema para solventar ese inconveniente.
        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    // **** Este codigo borra fisicamente el registro de la BD
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (usuarioBorrado === null) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // });
    // **********************************************************
    // **** Este codigo borra (DESACTIVA) UN registro de la BD
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
    // **********************************************************




});

//exporto app 
module.exports = app;