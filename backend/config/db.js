const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER_PASS}@cluster0.bgx4ufz.mongodb.net/Social-Networks?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to MonGoDB'))
    .catch((err) => console.log('Failed to connect to MonGoDB', err))