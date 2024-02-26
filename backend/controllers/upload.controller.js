const UserModel = require('../models/User.model');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs');

// Vérification du format du fichier
function checkFileFormat(mimetype) {
    const acceptedFormats = ["image/jpg", "image/png", "image/jpeg"];
    return acceptedFormats.includes(mimetype);
}

// Vérification de la taille du fichier
function checkFileSize(size, maxSizeKB) {
    return size <= maxSizeKB * 1000;
}

// Vérification de la validité de l'ID de l'utilisateur
async function checkUserId(userId) {
    if (!ObjectId.isValid(userId)) {
        throw new Error(`Invalid user ID: ${userId}`);
    }
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error(`User not found with ID: ${userId}`);
    }
}

// Fonction pour gérer le téléchargement de l'image
module.exports.uploadProfil = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const maxSizeFileKB = 500; // Taille maximale autorisée en kilo-octets
        const { size, mimetype, buffer } = req.file;
        const userId = req.body.userId;

        if (!checkFileFormat(mimetype)) {
            throw new Error("Incompatible format");
        }

        if (!checkFileSize(size, maxSizeFileKB)) {
            throw new Error(`File size too large. Maximum size allowed is ${maxSizeFileKB} KB`);
        }

        await checkUserId(userId);

        // Créer le chemin de destination
        const destinationFolder = __dirname + '/../client/public/uploads/profil';

        // Vérifier si le dossier de destination existe, sinon le créer
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Définir le chemin complet pour l'image
        const destinationPath = `${destinationFolder}/${userId}.jpg`;

        // Écrire le contenu du buffer dans le fichier
        await fs.promises.writeFile(destinationPath, buffer);

        return res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
