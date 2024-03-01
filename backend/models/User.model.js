// Importation des packages
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

// Création du schéma pour la base de données MongoDB
const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        ifAdmin: {
            type: Boolean,
            required: true,
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png",
        },
        bio: {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String],
        },
        likes: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(uniqueValidator);

// Exportation du schéma
module.exports = mongoose.model('User', userSchema);