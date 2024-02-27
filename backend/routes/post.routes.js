const router = require('express').Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer()


router.post('/', upload.single("file"), postController.createOnePost)
router.get('/', postController.getAllPosts)
router.put('/:id', postController.updateOnePost)
router.get('/:id', postController.getOnePost)
router.delete('/:id', postController.deleteOnePost)

// Like and Unlike
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)

// Comments
router.patch('/comment-post/:id', postController.commentPost)
router.patch('/edit-comment-post/:id', postController.editCommentPost)
router.patch('/delete-comment-post/:id', postController.deleteCommentPost)

module.exports = router;