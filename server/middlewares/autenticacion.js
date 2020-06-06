const jwt = require('jsonwebtoken');

// ==============================
// Verificar token -- viene en los headers Authorization
// ==============================
let verificaToken = (req, res, next) => {
    // recibe el nombre del token puesto en los headers, puede ser
    // cualquiera, en este caso se ha usado Authorization
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token no es valido',
                    err,
                },
            });
        }

        req.usuario = decoded.usuario;
        // permite que se ejecute el codigo luego de
        // la llamada al middleware
        next();
    });
};

// ==============================
// Verificar rol
// solo usuarios LOGUEADOS
// con rol ADMIN_ROLE podran crear, borrar y actualizar
// ==============================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            message: 'Solo administradores pueden crear, borrar y editar Usuarios',
        });
    }
};

// ==============================
// Verificar Token Img
// ==============================
let verificaToeknImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token no es valido',
                    err,
                },
            });
        }

        req.usuario = decoded.usuario;
        // permite que se ejecute el codigo luego de
        // la llamada al middleware
        next();
    });
};

module.exports = { verificaToken, verificaAdminRole, verificaToeknImg };