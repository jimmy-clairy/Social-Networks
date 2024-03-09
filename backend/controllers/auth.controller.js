const UserModel = require('../models/User.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET, ADMIN_PSEUDO, ADMIN_EMAIL } = process.env;

module.exports.signUp = async (req, res) => {
    const errors = {}

    try {
        const { pseudo, email, password } = req.body
        let ifAdmin = false;

        const checkIfPseudoExists = await UserModel.findOne({ pseudo: pseudo });
        if (checkIfPseudoExists) {
            errors.pseudo = `Le pseudo ${pseudo} est déjà utilisé.`
        }

        const checkIfEmailExists = await UserModel.findOne({ email: email });
        if (checkIfEmailExists) {
            errors.email = `L'email ${email} est déjà utilisé.`;
        }

        if (password.length < 6) {
            errors.password = `Le mot de passe doit comporter plus de 6 caractères. Actuellement, vous avez ${password.length} caractères.`
        }

        if (pseudo === ADMIN_PSEUDO && email === ADMIN_EMAIL) {
            ifAdmin = true
        }

        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({ errors })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new UserModel({
            pseudo: pseudo,
            email: email,
            password: hash,
            ifAdmin,
            bio: ''
        });

        await user.save();

        res.status(201).json({ message: `${ifAdmin ? 'Administrateur' : 'Utilisateur'} crée !`, userId: user.id })
    } catch (err) {
        res.status(500).json(err)
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

        // Génération du jeton JWT
        const token = jwt.sign(
            { userId: user.id },
            TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ userId: user.id, pseudo: user.pseudo, token });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}