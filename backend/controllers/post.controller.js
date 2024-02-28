const PostModel = require('../models/Post.model')
const UserModel = require('../models/User.model');
const { checkUserId, checkPostId } = require('../utils/check.utils');
const { uploadPicture } = require('../utils/uploadPicture.utils');
const fsPromises = require('fs').promises;

module.exports.createOnePost = async (req, res) => {
    try {
        const { posterId, message, video } = req.body

        await checkUserId(posterId)

        let picture;
        if (req.file) {
            picture = await uploadPicture(posterId, req.file, 'post')
        }

        if (!message && !video && !picture) {
            throw new Error('No data provided for creating the post')
        }

        const newPost = new PostModel({
            posterId,
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
        res.status(200).json({ message: 'Get all posts', posts })
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

        const post = await checkPostId(postId)

        // If the post has a picture, delete it
        if (post.picture) {
            await fsPromises.unlink(`client/public/${post.picture}`);
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

        await checkPostId(postId)

        const postUpdated = await PostModel.findByIdAndUpdate(postId, { message: req.body.message }, { new: true })

        res.status(200).json({ message: 'Update one post', postUpdated })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.body.id

        await checkPostId(postId)
        await checkUserId(userId)

        const postLiked = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likers: userId } },
            { new: true }
        ).select('posterId likers');

        const userLiked = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likes: postId } },
            { new: true }
        ).select('pseudo likes');


        res.status(200).json({ postLiked, userLiked });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.body.id

        await checkPostId(postId)
        await checkUserId(userId)

        const postLiked = await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { likers: userId } },
            { new: true }
        ).select('posterId likers');

        const userLiked = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { likes: postId } },
            { new: true }
        ).select('pseudo likes');


        res.status(200).json({ postLiked, userLiked });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


module.exports.commentPost = async (req, res) => {
    try {
        const postId = req.params.id

        await checkPostId(postId)

        const postCommented = await PostModel.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            }, { new: true }
        )

        res.status(200).json({ postCommented });
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports.editCommentPost = async (req, res) => {
    try {
        const postId = req.params.id

        await checkPostId(postId)

        const { comments } = post
        const comment = comments.find((comment) => comment.id === req.body.commentId)

        if (!comment) {
            return res.status(400).json({ error: `Not found Comment` })
        }

        comment.text = req.body.text

        await post.save()

        res.status(202).json(comment)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.deleteCommentPost = async (req, res) => {
    try {
        const postId = req.params.id

        await checkPostId(postId)

        /** Soluce 1 */
        const { comments } = post
        const otherComments = comments.filter((comment) => comment.id !== req.body.commentId)
        if (otherComments.length === 0) {
            return res.status(400).json({ error: `Not found comment` })
        }
        post.comments = otherComments

        await post.save()

        /** Soluce 2 */
        // const post = await PostModel.findByIdAndUpdate(
        //     postId,
        //     {
        //         $pull: {
        //             comments: {
        //                 _id: req.body.commentId
        //             }
        //         }
        //     },
        //     { new: true }
        // )

        res.status(202).json(post)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}