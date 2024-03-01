const router = require('express').Router()
const postController = require('../controllers/post.controller')
const commentController = require('../controllers/comment.controller')
const auth = require('../middlewares/auth.middleware')
const multer = require("multer")
const upload = multer()

/** http://localhost:5000/api/post */
router.post('/', auth, upload.single("file"), postController.createOnePost)
router.get('/', auth, postController.getAllPosts)
router.put('/:id', auth, upload.single("file"), postController.updateOnePost)
router.get('/:id', auth, postController.getOnePost)
router.delete('/:id', auth, postController.deleteOnePost)

// Like and Unlike
router.patch('/like/:id', auth, postController.likePost)
router.patch('/unlike/:id', auth, postController.unlikePost)

// Comments
router.patch('/comment/:id', auth, commentController.commentPost)
router.patch('/edit-comment/:id', auth, commentController.editCommentPost)
router.patch('/delete-comment/:id', auth, commentController.deleteCommentPost)

module.exports = router;