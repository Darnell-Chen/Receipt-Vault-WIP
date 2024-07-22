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
    let decoded;

    try {
        console.log("req headers : " + req.headers);
        let token = req.headers.Authorization;

        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        console.log(err);
        res.sendStatus(404);
        return;
    }

    res.sendStatus(200);
    return;
}

module.exports = {createToken, verifyToken};