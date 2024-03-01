require('dotenv').config({ path: './config/.env' })
require('./config/db')
const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Création de l'application express
const app = express();

// Permet d'accéder au corps de la requête
app.use(express.json());

// Erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;