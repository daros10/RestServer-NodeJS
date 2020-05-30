// =================================
// PUERTO
// =================================
process.env.PORT = process.env.PORT || 3000;

// =================================
// Entorno
// =================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =================================
// Base de datos 
// =================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    // urlDB = 'mongodb+srv://daros10:ckwURAz9Q8pEraxH@cluster0-pngyb.mongodb.net/cafe'
    // Mongo URI es la variable de entorno configura en Heroku
    urlDB = process.env.MONGO_URI;
}

// Creo un nombre de env cualquiera y asigno el valor de urlDB
process.env.URLDB = urlDB;