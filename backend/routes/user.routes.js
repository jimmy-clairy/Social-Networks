const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const multer = require("multer")
const upload = multer()

/** http://localhost:5000/api/user */
// Auth
router.post("/signup", authController.signUp)
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

module.exports = router;