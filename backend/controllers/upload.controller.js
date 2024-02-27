const UserModel = require('../models/User.model');
const fs = require('fs');
const { checkFileFormat, checkFileSize, checkUserId } = require('../utils/check.utils');

// Function to handle image upload
module.exports.uploadProfil = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const maxSizeFileKB = 500; // Maximum allowed size in kilobytes
        const { size, mimetype, buffer } = req.file;
        const userId = req.body.userId;
        const fileName = `${userId}.jpg`

        if (!checkFileFormat(mimetype)) {
            throw new Error("Incompatible format");
        }

        if (!checkFileSize(size, maxSizeFileKB)) {
            throw new Error(`File size too large. Maximum size allowed is ${maxSizeFileKB} KB`);
        }

        await checkUserId(userId);

        // Create the destination path
        const destinationFolder = __dirname + '/../client/public/uploads/profile';

        // Check if the destination folder exists, if not, create it
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Set the full path for the image
        const destinationPath = `${destinationFolder}/${fileName}`;

        // Write the buffer content to the file
        await fs.promises.writeFile(destinationPath, buffer);

        const userUpdated = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { picture: `./uploads/profile/${fileName}` } },
            { new: true }
        )

        return res.status(201).json({ message: 'Image uploaded successfully', userUpdated });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};