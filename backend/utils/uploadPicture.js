const fsPromises = require('fs').promises;
const { checkFileFormat, checkFileSize } = require("./check.utils");

/**
 * Uploads a picture for a user profile or a post.
 * @param {string} userId The userId of the user.
 * @param {object} file The file object containing information about the uploaded picture.
 * @param {number} file.size The size of the file in bytes.
 * @param {string} file.mimetype The MIME type of the file.
 * @param {Buffer} file.buffer The buffer containing the file data.
 * @param {('profile'|'post')} [type='profile'] The type of upload, can be 'profile' or 'post'. Default is 'profile'.
 * @param {number} [maxSizeFileKB=500] The maximum allowed size of the file in kilobytes. Default is 500KB.
 * @returns {Promise<string>} A Promise that resolves with the path to the uploaded picture.
 * @throws {Error} If the file format is incompatible or the file size exceeds the maximum allowed size.
 */
module.exports.uploadPicture = async (userId, file, type = 'profile', maxSizeFileKB = 500) => {
    const { size, mimetype, buffer } = file;

    // Check file format and size
    if (!checkFileFormat(mimetype)) {
        throw new Error("Incompatible format");
    }

    if (!checkFileSize(size, maxSizeFileKB)) {
        throw new Error(`File size too large. Maximum size allowed is ${maxSizeFileKB} KB`);
    }

    // Create destination folder
    const destinationFolder = `${__dirname}/../client/public/uploads/${type}`;
    await fsPromises.mkdir(destinationFolder, { recursive: true });

    // Set file name and path
    const fileName = `${userId}.jpg`;
    const destinationPath = `${destinationFolder}/${fileName}`;

    // Write file to destination
    await fsPromises.writeFile(destinationPath, buffer);

    // Return path to the uploaded picture
    return `./uploads/${type}/${fileName}`;
}