const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");
const fsPromises = require('fs').promises;

module.exports.deletePicturePost = async (posts) => {
    for (const post of posts) {
        if (post.picture) {
            await fsPromises.unlink(`client/public/${post.picture}`);
        }
    }
}

module.exports.deleteCommentsOfUser = async (userId) => {
    await PostModel.updateMany(
        { "comments.commenterId": userId }, // Condition for finding posts with user comments
        { $pull: { comments: { commenterId: userId } } } // Delete user comments
    );
};

module.exports.deleteLikesAndUnlikes = async (userId) => {
    await PostModel.updateMany({}, { $pull: { likers: userId } });
    await UserModel.updateMany({}, { $pull: { likes: userId } });
}

module.exports.deleteLikesOfUser = async (userPosts) => {
    const postIdsLikedByUser = userPosts.map(post => post.id);
    await UserModel.updateMany(
        { likes: { $in: postIdsLikedByUser } },
        { $pull: { likes: { $in: postIdsLikedByUser } } }
    );
};

module.exports.deletePosts = async (userId) => {
    await PostModel.deleteMany({ posterId: userId });
};

module.exports.deleteUserFromFollowersAndFollowing = async (userId) => {
    await UserModel.updateMany(
        { $or: [{ followers: userId }, { following: userId }] },
        { $pull: { followers: userId, following: userId } }
    );
};