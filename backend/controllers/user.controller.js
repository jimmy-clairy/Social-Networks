const UserModel = require("../models/User.model")
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: `Invalid user ID: ${userId}` })
        }
        const user = await UserModel.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: `User not found with ID: ${id}` });
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(`ID unknown : ${err}`)
    }
}

module.exports.updateOneUser = async (req, res) => {
    try {
        const userId = req.params.id

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: `Invalid user ID: ${userId}` })
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: `User not found with ID: ${userId}` });
        }

        const userUpdated = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { bio: req.body.bio } },
            { new: true }
        ).select('-password');

        res.status(203).json(userUpdated)
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports.deleteOneUser = async (req, res) => {
    try {

        const userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: `Invalid user ID: ${userId}` })
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: `User not found with ID: ${userId}` });
        }

        await UserModel.findByIdAndDelete(userId)
        res.status(200).json('User has been deleted')
    } catch (err) {
        return res.status(500).json('Problem deleteOneUser')
    }
}


module.exports.follow = async (req, res) => {
    try {
        const followerId = req.params.id;
        const followingId = req.body._id;

        if (followerId === followingId) {
            return res.status(400).json({ error: `Impossible follower ID: ${followerId} and following ID: ${followingId} same Id` });
        }

        // Validate follower ID
        if (!ObjectId.isValid(followerId)) {
            return res.status(400).json({ error: `Invalid follower ID: ${followerId}` });
        }

        // Validate following ID
        if (!ObjectId.isValid(followingId)) {
            return res.status(400).json({ error: `Invalid following ID: ${followingId}` });
        }

        // Check if follower exists
        const follower = await UserModel.findById(followerId);
        if (!follower) {
            return res.status(404).json({ error: `Follower not found with ID: ${followerId}` });
        }

        // Check if following user exists
        const following = await UserModel.findById(followingId);
        if (!following) {
            return res.status(404).json({ error: `Following user not found with ID: ${followingId}` });
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
    } catch (error) {
        console.error('Error in follow:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.unfollow = async (req, res) => {
    try {
        const followerId = req.params.id;
        const followingId = req.body._id;

        if (followerId === followingId) {
            return res.status(400).json({ error: `Impossible follower ID: ${followerId} and following ID: ${followingId} same Id` });
        }

        // Validate follower ID
        if (!ObjectId.isValid(followerId)) {
            return res.status(400).json({ error: `Invalid follower ID: ${followerId}` });
        }

        // Validate following ID
        if (!ObjectId.isValid(followingId)) {
            return res.status(400).json({ error: `Invalid following ID: ${followingId}` });
        }

        // Check if follower exists
        const follower = await UserModel.findById(followerId);
        if (!follower) {
            return res.status(404).json({ error: `Follower not found with ID: ${followerId}` });
        }

        // Check if following user exists
        const following = await UserModel.findById(followingId);
        if (!following) {
            return res.status(404).json({ error: `Following user not found with ID: ${followingId}` });
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
        res.status(200).json({ updatedFollower, updatedFollowing });
    } catch (error) {
        console.error('Error in unfollow:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

