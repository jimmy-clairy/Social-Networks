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
        res.status(500).json({ error })
    }

}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }) // Permet d'inversé les posts
        res.status(200).json({ message: 'Get all posts', posts })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports.getOnePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        res.status(200).json({ message: 'Get one post', post })
    } catch (error) {
        res.status(500).json({ error })
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
        res.status(500).json({ error })
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
        res.status(500).json({ error })
    }
}


module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.body.id

        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: `Invalid User ID: ${userId}` })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({ error: `Invalid user ID: ${userId}` })
        }

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
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.body.id

        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: `Invalid User ID: ${userId}` })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({ error: `Invalid user ID: ${userId}` })
        }

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
    } catch (error) {
        res.status(500).json({ error })
    }
}


module.exports.commentPost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

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
        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

        const { comments } = post
        const comment = comments.find((comment) => comment.id === req.body.commentId)

        if (!comment) {
            return res.status(400).json({ error: `Not found Comment` })
        }

        comment.text = req.body.text

        await post.save()

        res.status(202).json(comment)
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports.deleteCommentPost = async (req, res) => {
    try {
        const postId = req.params.id
        if (!ObjectId.isValid(postId)) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json({ error: `Invalid Post ID: ${postId}` })
        }

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
    } catch (error) {
        res.status(500).json({ error })
    }
}