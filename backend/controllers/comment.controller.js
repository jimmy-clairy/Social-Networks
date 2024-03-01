const PostModel = require('../models/Post.model');
const { checkUserId, checkPostId } = require('../utils/check.utils');

module.exports.commentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.auth.userId

        await checkPostId(postId);
        const user = await checkUserId(userId)

        const commenterPseudo = user.pseudo
        const text = req.body.text;

        // Check if all required fields are provided
        if (!text) {
            throw new Error('Please provide text for the comment');
        }

        const newComment = {
            commenterId: userId,
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

        if (comment.commenterId !== req.auth.userId) {
            return res.status(401).json({ error: `Unauthorized: You are not allowed to update this comment.` });
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
        const comment = post.comments.find(comment => comment._id.equals(commentId));
        if (!comment) {
            return res.status(400).json({ error: `Comment not found` });
        }

        const userAuth = await checkUserId(req.auth.userId);
        if (!userAuth.ifAdmin && comment.commenterId !== req.auth.userId) {
            return res.status(401).json({ error: `Unauthorized: You are not allowed to delete this comment.` })
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