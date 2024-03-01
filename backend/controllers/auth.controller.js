const UserModel = require('../models/User.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET } = process.env;

module.exports.signUp = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body

        if (password.length < 6) {
            return res.status(400).json({ errors: `Le mot de passe doit comporter plus de 6 caractères. Actuellement, vous avez ${password.length} caractères.` })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new UserModel({
            pseudo: pseudo,
            email: email,
            password: hash,
            bio: ''
        });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé !", userId: user._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: "Paire identifiant/mot de passe incorrecte" });
        }

        const passwordIfValid = await bcrypt.compare(password, user.password);
        if (!passwordIfValid) {
            return res.status(401).json({ error: "Paire identifiant/mot de passe incorrecte" });
        }

        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                TOKEN_SECRET,
                { expiresIn: '24h' })
        });

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}