const mongoose = require('mongoose')

mongoose
    .connect(process.env.DB_USER_PASS)
    .then(() => console.log('Connected to MonGoDB'))
    .catch((err) => console.log('Failed to connect to MonGoDB', err))