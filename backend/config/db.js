const mongoose = require('mongoose')
const { DB_USER_PASS, DB_NAME } = process.env

mongoose
    .connect(`mongodb+srv://${DB_USER_PASS}@cluster0.bgx4ufz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to MonGoDB'))
    .catch((err) => console.log('Failed to connect to MonGoDB', err))