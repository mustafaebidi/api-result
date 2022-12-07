const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        async (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token

            req.user = await User.findById(decoded.id).select("-password")

            next();
        }
    );
}

module.exports = verifyJWT