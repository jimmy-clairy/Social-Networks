const PostModel = require("../models/Post.model")
const UserModel = require("../models/User.model")
const fsPromises = require('fs').promises
const { checkUserId } = require("../utils/check.utils")
const { deleteAllUserData } = require("../utils/deleteAllUserData.utils")
const { uploadPicture } = require("../utils/uploadPicture.utils")

const handleError = (res, err) => {
    res.status(500).json({ error: err.message })
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password')
        res.status(200).json({ message: `Get ${users.length} users`, users })
    } catch (err) {
        handleError(res, err)
    }
}

module.exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await checkUserId(userId)

        res.status(200).json(user)
    } catch (err) {
        handleError(res, err)
    }
}

module.exports.updateOneUser = async (req, res) => {
    try {
        const userId = req.params.id
        const file = req.file

        const user = await checkUserId(userId)

        if (user.id !== req.auth.userId) {
            throw new Error('Unauthorized: You are not allowed to update this user.')
        }
        console.log(req.body.bio);
        console.log(req.file);
        if (!req.body.bio && !req.file) {
            throw new Error('No data provided for creating the post')
        }

        let picture
        if (file) {
            picture = await uploadPicture(userId, file)
        }

        const userUpdated = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { bio: req.body.bio, picture } },
            { new: true }
        ).select('-password')

        res.status(203).json(userUpdated)
    } catch (err) {
        return handleError(res, err)
    }
}

module.exports.deleteOneUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userAuth = req.auth.userId

        const user = await checkUserId(userId)

        if (!userAuth.ifAdmin && user.id !== userAuth) {
            throw new Error('Unauthorized: You are not allowed to delete this user.')
        }

        // Find all posts of the user
        const userPosts = await PostModel.find({ posterId: userId })

        await deleteAllUserData(userId, userPosts)

        // Delete the user's profile picture if it exists and it's not the default picture
        if (user.picture && user.picture !== './profil/random-user.png') {
            await fsPromises.unlink(`${process.env.PATH_PICTURE}/${user.picture}`)
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId)

        res.status(200).json('User, posts, and associated data have been deleted')
    } catch (err) {
        return handleError(res, err)
    }
}

module.exports.follow = async (req, res) => {
    try {
        const followerId = req.auth.userId
        const followingId = req.params.id

        await checkUserId(followerId)
        await checkUserId(followingId)

        if (followerId === followingId) {
            return res.status(400).json({ error: `Cannot follow yourself. Follower ID: ${followerId}, Following ID: ${followingId}` })
        }

        // Add followingId to follower's following list
        const updatedFollower = await UserModel.findByIdAndUpdate(
            followerId,
            { $addToSet: { following: followingId } },
            { new: true }
        )

        // Add followerId to following user's followers list
        const updatedFollowing = await UserModel.findByIdAndUpdate(
            followingId,
            { $addToSet: { followers: followerId } },
            { new: true }
        )

        // Respond with updated follower and following user
        res.status(201).json({ updatedFollower, updatedFollowing })
    } catch (err) {
        handleError(res, err)
    }
}

module.exports.unfollow = async (req, res) => {
    try {
        const followerId = req.auth.userId
        const followingId = req.params.id

        await checkUserId(followerId)
        await checkUserId(followingId)

        if (followerId === followingId) {
            return res.status(400).json({ error: `Cannot unfollow yourself. Follower ID: ${followerId}, Following ID: ${followingId}` })
        }

        // Remove followingId from follower's following list
        const updatedFollower = await UserModel.findByIdAndUpdate(
            followerId,
            { $pull: { following: followingId } },
            { new: true }
        )

        // Remove followerId from following user's followers list
        const updatedFollowing = await UserModel.findByIdAndUpdate(
            followingId,
            { $pull: { followers: followerId } },
            { new: true }
        )

        // Respond with updated follower and following user
        res.status(201).json({ updatedFollower, updatedFollowing })
    } catch (err) {
        handleError(res, err)
    }
}