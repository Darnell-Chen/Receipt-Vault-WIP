const express = require('express');
const connectToPool = require("../db");
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");

const route = express.Router();

let pool;

const getUserInfo = async (req) => {
    const userInfoPrompt = `
    SELECT * FROM accounts
    WHERE email = ${req.user}
    `

    const [rows, fields] = await pool.query(userInfoPrompt);
    console.log(rows);
}

const getUserReceipts = async (req) => {
    const userInfoPrompt = `
    SELECT * FROM receipts
    WHERE email = ${req.user}
    `

    const [rows, fields] = await pool.query(userInfoPrompt);
    console.log(rows);
}

route.get("/getData", verifyToken, async function(req, res) {
    pool = await connectToPool();

    getUserInfo(req);

    res.sendStatus(200);
    return;
})

module.exports = route;