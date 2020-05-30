const mongoose = require('mongoose');

// mongoose unique validator 
const uniqueValidator = require('mongoose-unique-validator');

// defino un tipo enum para que el rol solo acepte los roles establecidos 
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido.'
}

let Schema = mongoose.Schema;

// Genero el modelo o schema de mi coleccion (TABLA) de la DB
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// esto es para no mostrar que existe el campo contrasena 
// en la respuesta de un post 
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// asigno el plugin del uniqueValidator al schema de la bd
usuarioSchema.plugin(uniqueValidator, {
    // email
    message: '{PATH} debe ser unico.'
});

// Exporto el eschema y le asigno el nombre real que tendra la coleccion 
module.exports = mongoose.model('Usuario', usuarioSchema);