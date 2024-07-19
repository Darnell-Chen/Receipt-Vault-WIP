const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(email) {
    const payload = {
        email: email
    }

    // I'll have the expiration of the token be in 3 hrs
    const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '3h'});
    return token;
}

function verifyToken(token) {
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err);
        return false;
    }

    return decoded;
}

module.exports = {createToken, verifyToken};