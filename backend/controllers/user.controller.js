const UserModel = require("../models/User.model");
const fsPromises = require('fs').promises;
const { checkUserId } = require("../utils/check.utils");
const { uploadPicture } = require("../utils/uploadPicture.utils");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await checkUserId(userId)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.updateOneUser = async (req, res) => {
    try {
        const userId = req.params.id

        await checkUserId(userId)

        let picture;
        if (req.file) {
            picture = await uploadPicture(userId, req.file)
        }

        const userUpdated = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { bio: req.body.bio, picture } },
            { new: true }
        ).select('-password');

        res.status(203).json(userUpdated)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports.deleteOneUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await checkUserId(userId);

        // Remove user from followers and following arrays of other users
        await UserModel.updateMany(
            { $or: [{ followers: userId }, { following: userId }] },
            { $pull: { followers: userId, following: userId } }
        );

        // Delete the user's profile picture if it exists and it's not the default picture
        const isDefaultPicture = user.picture === './uploads/profil/random-user.png';
        if (!isDefaultPicture && user.picture) {
            await fsPromises.unlink(`client/public/${user.picture}`);
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId);

        res.status(200).json('User has been deleted');
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports.follow = async (req, res) => {
    try {
        const followerId = req.params.id;
        const followingId = req.body.id;

        await checkUserId(followerId)
        await checkUserId(followingId)

        if (followerId === followingId) {
            return res.status(400).json({ error: `Cannot follow yourself. Follower ID: ${followerId}, Following ID: ${followingId}` });
        }

        // Add followingId to follower's following list
        const updatedFollower = await UserModel.findByIdAndUpdate(
            followerId,
            { $addToSet: { following: followingId } },
            { new: true }
        );

        // Add followerId to following user's followers list
        const updatedFollowing = await UserModel.findByIdAndUpdate(
            followingId,
            { $addToSet: { followers: followerId } },
            { new: true }
        );

        // Respond with updated follower and following user
        res.status(201).json({ updatedFollower, updatedFollowing });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.unfollow = async (req, res) => {
    try {
        const followerId = req.params.id;
        const followingId = req.body.id;

        await checkUserId(followerId)
        await checkUserId(followingId)

        if (followerId === followingId) {
            return res.status(400).json({ error: `Cannot unfollow yourself. Follower ID: ${followerId}, Following ID: ${followingId}` });
        }

        // Remove followingId from follower's following list
        const updatedFollower = await UserModel.findByIdAndUpdate(
            followerId,
            { $pull: { following: followingId } },
            { new: true }
        );

        // Remove followerId from following user's followers list
        const updatedFollowing = await UserModel.findByIdAndUpdate(
            followingId,
            { $pull: { followers: followerId } },
            { new: true }
        );

        // Respond with updated follower and following user
        res.status(201).json({ updatedFollower, updatedFollowing });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};