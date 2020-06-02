// =================================
// PUERTO
// =================================
process.env.PORT = process.env.PORT || 3000;

// =================================
// Entorno
// =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
// Vencimiento del token
// =================================
// 60 seg 60 min 24 horas 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =================================
// Seed - Semilla de autenticacion
// =================================
// SEED creada en heroku
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';

// =================================
// Base de datos
// =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // urlDB = 'mongodb+srv://daros10:ckwURAz9Q8pEraxH@cluster0-pngyb.mongodb.net/cafe'
    // Mongo URI es la variable de entorno configura en Heroku
    urlDB = process.env.MONGO_URI;
}

// Creo un nombre de env cualquiera y asigno el valor de urlDB
process.env.URLDB = urlDB;

// =================================
// Google client
// =================================
process.env.CLIENT_ID =
    process.env.CLIENT_ID ||
    '782450086040-i44d6i9vdn5ma5la6bltb395a27o4akj.apps.googleusercontent.com';