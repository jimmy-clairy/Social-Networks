const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const multer = require("multer")
const upload = multer()

// Auth
router.post("/register", authController.signUp)
router.post("/login", authController.login)
router.get("/logout", authController.logout)

// User 
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getOneUser)
router.put("/:id", userController.updateOneUser)
router.delete("/:id", userController.deleteOneUser)

// Follow
router.patch("/follow/:id", userController.follow)
router.patch("/unfollow/:id", userController.unfollow)

// Upload
router.post('/upload', upload.single("file"), uploadController.uploadProfil);

module.exports = router;