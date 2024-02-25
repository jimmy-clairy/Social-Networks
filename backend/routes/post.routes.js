const router = require('express').Router()
const postController = require('../controllers/post.controller')

router.post('/', postController.createOnePost)
router.get('/', postController.getAllPosts)
router.put('/:id', postController.updateOnePost)
router.get('/:id', postController.getOnePost)
router.delete('/:id', postController.deleteOnePost)

// Like and Unlike
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)

module.exports = router;