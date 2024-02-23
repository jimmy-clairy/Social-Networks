require('dotenv').config({ path: './config/.env' })
require('./config/db')

const express = require('express');
// const path = require('path');

const userRoutes = require('./routes/user.route');
// const postRoutes = require('./routes/post');

// Création de l'application express    
const app = express();

// Erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Permet d'accéder au corps de la requête
app.use(express.json());

app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;