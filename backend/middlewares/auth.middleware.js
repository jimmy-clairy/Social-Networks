const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error('No authorization')

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };

        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};