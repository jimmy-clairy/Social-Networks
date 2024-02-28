const router = require('express').Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer()

/** http://localhost:5000/api/post */
router.post('/', upload.single("file"), postController.createOnePost)
router.get('/', postController.getAllPosts)
router.put('/:id', upload.single("file"), postController.updateOnePost)
router.get('/:id', postController.getOnePost)
router.delete('/:id', postController.deleteOnePost)

// Like and Unlike
router.patch('/like/:id', postController.likePost)
router.patch('/unlike/:id', postController.unlikePost)

// Comments
router.patch('/comment/:id', postController.commentPost)
router.patch('/edit-comment/:id', postController.editCommentPost)
router.patch('/delete-comment/:id', postController.deleteCommentPost)

module.exports = router;