const PostModel = require('../models/Post.model');
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
        res.status(200).json({ message: `Get ${posts.length} posts`, posts })
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
        const postId = req.params.id;
        const { message, video } = req.body;

        const post = await checkPostId(postId);

        let picture = post.picture; // Keep the existing picture by default

        // Update picture if a new file is uploaded
        if (req.file) {
            picture = await uploadPicture(postId, req.file, 'post', undefined, picture);
        }

        // Update post with new message, video, and picture
        const postUpdated = await PostModel.findByIdAndUpdate(
            postId,
            { message, video, picture },
            { new: true }
        );

        res.status(200).json({ message: 'Update one post', postUpdated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
        const postId = req.params.id;

        await checkPostId(postId);

        const { commenterId, commenterPseudo, text } = req.body;

        // Check if all required fields are provided
        if (!commenterId || !commenterPseudo || !text) {
            throw new Error('Please provide commenterId, commenterPseudo, and text for the comment');
        }

        const newComment = {
            commenterId,
            commenterPseudo,
            text,
            timestamp: Date.now()
        };

        // Push the new comment to the array in the post
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment } },
            { new: true }
        );

        res.status(201).json({ message: 'Comment created successfully', updatedPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.editCommentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const newText = req.body.text;
        const commentId = req.body.commentId;

        const post = await checkPostId(postId);

        // Check if the new text exists
        if (!newText) {
            throw new Error(`Text is required`);
        }

        // Find the comment to edit
        const comment = post.comments.find((comment) => comment._id.equals(commentId));
        if (!comment) {
            return res.status(400).json({ error: `Comment not found` });
        }

        // Update the text of the comment
        comment.text = newText;

        await post.save();

        res.status(202).json({ message: 'Comment updated successfully', updatedComment: comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteCommentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.body.commentId;

        const post = await checkPostId(postId);

        // Check if the comment exists in the post
        const commentExists = post.comments.some(comment => comment._id.equals(commentId));
        if (!commentExists) {
            return res.status(400).json({ error: `Comment not found` });
        }

        // Remove the comment from the post
        await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        res.status(202).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}