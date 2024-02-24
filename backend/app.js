require('dotenv').config({ path: './config/.env' })
require('./config/db')
const express = require('express');
const cookieParser = require('cookie-parser')
const { checkUser, requireAuth } = require('./middlewares/auth.middleware')

// Routes
const userRoutes = require('./routes/user.route');
// const postRoutes = require('./routes/post.route');

// Création de l'application express    
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

// Erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Permet d'accéder au corps de la requête

app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;