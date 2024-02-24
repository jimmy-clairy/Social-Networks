const PostModel = require('../models/Post.model')
const UserModel = require('../models/User.model')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.createOnePost = async (req, res) => {
    try {
        const newPost = new PostModel({
            posterId: req.body.posterId,
            message: req.body.message,
            video: req.body.video
        })
        await newPost.save()
        res.status(201).json({ message: 'Create one Post', newPost })
    } catch (error) {
        res.status(500).json('Problème Serveur')
    }

}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).json({ message: 'Get all posts', posts })
    } catch (error) {
        res.status(500).json('Problème Serveur')
    }
}

module.exports.getOnePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        res.status(200).json({ message: 'Get one post', post })
    } catch (error) {
        res.status(500).json('Problème Serveur')
    }
}

module.exports.deleteOnePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        await PostModel.findByIdAndDelete(postId)

        res.status(200).json({ message: 'Delete one post' })
    } catch (error) {
        res.status(500).json('Problème Serveur')
    }
}

module.exports.updateOnePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        const postUpdated = await PostModel.findByIdAndUpdate(postId, { message: req.body.message }, { new: true })

        res.status(200).json({ message: 'Update one post', postUpdated })
    } catch (error) {
        res.status(500).json('Problème Serveur')
    }
}
