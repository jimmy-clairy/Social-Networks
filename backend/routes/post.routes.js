const router = require('express').Router()
const postController = require('../controllers/post.controller')

router.post('/', postController.createOnePost)
router.get('/', postController.getAllPosts)
router.put('/:id', postController.updateOnePost)
router.get('/:id', postController.getOnePost)
router.delete('/:id', postController.deleteOnePost)


module.exports = router;