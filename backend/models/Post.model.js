const mongoose = require('mongoose');

// Création du schéma pour la base de données MongoDB
const postSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlenght: 500
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        likers: {
            type: [String],
            required: true
        },
        comments: {
            type: [{
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamp: Number
            }],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);