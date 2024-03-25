const UserModel = require('../models/User.model')
const { uploadPicture } = require('../utils/uploadPicture.utils')


module.exports.uploadProfil = async (req, res) => {
    try {
        const file = req.file
        const { userId } = req.auth

        let picture
        if (file) {
            picture = await uploadPicture(userId, file)
        }

        const userUpdated = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { picture: picture } },
            { new: true }
        ).select('-password')

        return res.status(203).json(userUpdated)
    } catch (err) {
        return res.status(203).json(err.message)
    }
}