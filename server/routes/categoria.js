const express = require('express');
const _ = require('underscore');

const Categoria = require('../models/categorias');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');


const app = express();

// ==============================
// Obtener todas las categorias
// ==============================
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        // populate permite mostrar la informacion de un object id, en estecaso del usuario
        .populate('usuario', 'nombre email')
        .exec((err, categoriasDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!categoriasDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existen categorias.'
                    }
                });
            }

            res.json({
                ok: true,
                categorias: categoriasDB
            });
        });
});
// ==============================
// Obtener todas las categorias por id
// ==============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id)
        .exec((err, categoriaBD) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!categoriaBD) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontro categoria con ese ID.'
                    }
                });
            }

            res.json({
                ok: true,
                categorias: categoriaBD
            });
        });
});
// ==============================
// Crear categorias 
// ==============================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
// ==============================
// Actualizar categoria  
// ==============================

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!categoriaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontro categoria con ese ID.'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD,
        });
    });

});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (categoriaBD === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontro categoria con ese ID.',
                },
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBD
        });
    });
});

module.exports = app;