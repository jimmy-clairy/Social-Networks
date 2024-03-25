const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const auth = require('../middlewares/auth.middleware')
const multer = require("multer")
const upload = multer()

/** http://localhost:5000/api/user */
// Auth
router.post("/signup", authController.signUp)
router.post("/login", authController.login)

// User 
router.get("/", userController.getAllUsers)
router.get("/:id", auth, userController.getOneUser)
router.put("/:id", auth, userController.updateOneUser)
router.delete("/:id", auth, userController.deleteOneUser)

// Follow
router.patch("/follow/:id", auth, userController.follow)
router.patch("/unfollow/:id", auth, userController.unfollow)

// Upload
router.post('/upload', auth, upload.single("file"), uploadController.uploadProfil)

module.exports = router;