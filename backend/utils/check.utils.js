const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Checks if a user ID is valid and exists in the database.
 * @param {string} userId The ID of the user to check.
 * @returns {Promise<void>} A Promise that resolves if the user ID is valid and exists, otherwise throws an error.
 * @throws {Error} If the user ID is invalid or the user does not exist.
 */
module.exports.checkUserId = async (userId) => {
    if (!ObjectId.isValid(userId)) {
        throw new Error(`Invalid user ID: ${userId}`);
    }
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
        throw new Error(`User not found with ID: ${userId}`);
    }

    return user
}

/**
 * Checks if a post ID is valid and exists in the database.
 * @param {string} postId The ID of the post to check.
 * @returns {Promise<void>} A Promise that resolves if the post ID is valid and exists, otherwise throws an error.
 * @throws {Error} If the post ID is invalid or the post does not exist.
 */
module.exports.checkPostId = async (postId) => {
    if (!ObjectId.isValid(postId)) {
        throw new Error(`Invalid post ID: ${postId}`);
    }
    const post = await PostModel.findById(postId);
    if (!post) {
        throw new Error(`Post not found with ID: ${postId}`);
    }

    return post
}

/**
 * Checks if the file format is supported.
 * @param {string} mimetype The MIME type of the file.
 * @returns {boolean} True if the format is accepted, otherwise false.
 */
module.exports.checkFileFormat = (mimetype) => {
    const acceptedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
    return acceptedFormats.includes(mimetype);
}

/**
 * Checks if the file size is within the allowed limit.
 * @param {number} size The size of the file in bytes.
 * @param {number} maxSizeKB The maximum size allowed in kilobytes.
 * @returns {boolean} True if the size is within the limit, otherwise false.
 */
module.exports.checkFileSize = (size, maxSizeKB) => {
    return size <= maxSizeKB * 1000;
}