const PostModel = require('../models/Post.model')
const UserModel = require('../models/User.model')
const { checkUserId, checkPostId } = require('../utils/check.utils')
const { uploadPicture } = require('../utils/uploadPicture.utils')
const fsPromises = require('fs').promises

module.exports.createOnePost = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { message, video } = req.body
        const file = req.file

        const user = await checkUserId(userId)

        let picture
        if (file) {
            picture = await uploadPicture(userId, file, 'post')
        }

        if (!message && !video && !picture) {
            throw new Error('No data provided for creating the post')
        }

        const newPost = new PostModel({
            posterId: userId,
            posterPseudo: user.pseudo,
            message,
            video,
            picture
        })

        await newPost.save()

        res.status(201).json({ message: `Create one Post${picture ? ' with a picture' : ' without picture'}`, newPost })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }) // Permet d'inversé les posts
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.getOnePost = async (req, res) => {
    try {
        const postId = req.params.id

        await checkPostId(postId)

        const post = await PostModel.findById(postId)

        res.status(200).json({ message: 'Get one post', post })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.deleteOnePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.auth.userId

        const post = await checkPostId(postId)

        const userAuth = await checkUserId(userId)
        if (!userAuth.ifAdmin && post.posterId !== userId) {
            return res.status(401).json({ error: `Unauthorized: You are not allowed to delete this post.` })
        }

        // If the post has a picture, delete it
        if (post.picture) {
            await fsPromises.unlink(`${process.env.PATH_PICTURE}/${post.picture}`)
        }

        await PostModel.findByIdAndDelete(postId)

        res.status(200).json({ message: 'Delete one post' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.updateOnePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.auth.userId
        const { message, video } = req.body

        const post = await checkPostId(postId)

        if (post.posterId !== userId) {
            throw new Error('Unauthorized: You are not allowed to update this post.')
        }

        if (!message && !video && !req.file) {
            throw new Error('No data provided for creating the post')
        }

        let picture = post.picture // Keep the existing picture by default

        // Update picture if a new file is uploaded
        if (req.file) {
            picture = await uploadPicture(postId, req.file, 'post', undefined, picture)
        }

        // Update post with new message, video, and picture
        const postUpdated = await PostModel.findByIdAndUpdate(
            postId,
            { message, video, picture },
            { new: true }
        )

        res.status(200).json({ message: 'Update one post', postUpdated })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.auth.userId

        await checkPostId(postId)
        await checkUserId(userId)

        const postLiked = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likers: userId } },
            { new: true }
        ).select('posterId likers')

        const userLiked = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likes: postId } },
            { new: true }
        ).select('pseudo likes')

        res.status(200).json({ userLiked, postLiked })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.auth.userId

        await checkPostId(postId)
        await checkUserId(userId)

        const postLiked = await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { likers: userId } },
            { new: true }
        ).select('posterId likers')

        const userLiked = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { likes: postId } },
            { new: true }
        ).select('pseudo likes')


        res.status(200).json({ userLiked, postLiked })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}