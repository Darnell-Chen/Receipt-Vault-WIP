const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(email) {
    const payload = {
        email: email
    }

    // I'll have the expiration of the token be in 3 hrs
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '100h'});
    return token;
}

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.split(" ")[1];

        decoded = jwt.verify(parsedToken, process.env.JWT_SECRET);

        req.user = decoded.email;
        next();
    } catch(err) {
        console.log("JWT token is expired");
        res.sendStatus(401);
        return;
    }

    return;
}

module.exports = {createToken, verifyToken};