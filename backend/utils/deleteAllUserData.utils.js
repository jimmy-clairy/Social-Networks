const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");
const fsPromises = require('fs').promises;

/**
 * Deletes the picture associated with each post if it exists.
 * @param {Array} posts - Array of posts to delete pictures from.
 */
const deletePicturePost = async (posts) => {
    try {
        for (const post of posts) {
            if (post.picture) {
                await fsPromises.unlink(`client/public/${post.picture}`);
            }
        }
    } catch (error) {
        console.error("Error deleting post pictures:", error);
        throw error;
    }
}

/**
 * Deletes comments made by a specific user from all posts.
 * @param {string} userId - ID of the user whose comments are to be deleted.
 */
const deleteCommentsOfUser = async (userId) => {
    try {
        await PostModel.updateMany(
            { "comments.commenterId": userId },
            { $pull: { comments: { commenterId: userId } } }
        );
    } catch (error) {
        console.error("Error deleting user comments:", error);
        throw error;
    }
};

/**
 * Deletes likes and unlikes made by a specific user from all posts and from the user model.
 * @param {string} userId - ID of the user whose likes and unlikes are to be deleted.
 */
const deleteLikesAndUnlikes = async (userId) => {
    try {
        await PostModel.updateMany({}, { $pull: { likers: userId } });
        await UserModel.updateMany({}, { $pull: { likes: userId } });
    } catch (error) {
        console.error("Error deleting likes and unlikes:", error);
        throw error;
    }
}

/**
 * Deletes likes made by a specific user from the likes array of all users.
 * @param {Array} userPosts - Array of posts liked by the user.
 */
const deleteLikesOfUser = async (userPosts) => {
    try {
        const postIdsLikedByUser = userPosts.map(post => post.id);
        await UserModel.updateMany(
            { likes: { $in: postIdsLikedByUser } },
            { $pull: { likes: { $in: postIdsLikedByUser } } }
        );
    } catch (error) {
        console.error("Error deleting user likes from other users:", error);
        throw error;
    }
};

/**
 * Deletes all posts created by a specific user.
 * @param {string} userId - ID of the user whose posts are to be deleted.
 */
const deletePosts = async (userId) => {
    try {
        await PostModel.deleteMany({ posterId: userId });
    } catch (error) {
        console.error("Error deleting user posts:", error);
        throw error;
    }
};

/**
 * Removes a user from the followers and following lists of all users.
 * @param {string} userId - ID of the user to be removed from followers and following lists.
 */
const deleteUserFromFollowersAndFollowing = async (userId) => {
    try {
        await UserModel.updateMany(
            { $or: [{ followers: userId }, { following: userId }] },
            { $pull: { followers: userId, following: userId } }
        );
    } catch (error) {
        console.error("Error deleting user from followers and following lists:", error);
        throw error;
    }
};

/**
 * Deletes all data associated with a user, including posts, comments, likes, followers, and following.
 * @param {string} userId - ID of the user whose data is to be deleted.
 * @param {Array} userPosts - Array of posts created by the user.
 */
module.exports.deleteAllUserData = async (userId, userPosts) => {
    try {
        await Promise.all([
            deletePicturePost(userPosts),
            deleteCommentsOfUser(userId),
            deleteLikesAndUnlikes(userId),
            deletePosts(userId),
            deleteUserFromFollowersAndFollowing(userId),
            deleteLikesOfUser(userPosts)
        ]);
    } catch (error) {
        console.error("Error deleting user data:", error);
        throw error;
    }
};
