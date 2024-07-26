const express = require('express');
const connectToPool = require("../db");
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");

const route = express.Router();

let pool;

const getUserInfo = async (req) => {
    const userInfoPrompt = `
    SELECT * FROM accounts
    WHERE email='${req.user}'
    `

    const [rows, fields] = await pool.query(userInfoPrompt);

    if (rows.length !== 1) {
        throw "no account found, or too many found while fetching user data"
    } else {
        delete rows[0].password;
        req.uuid = rows[0].uuid;
        return rows;
    }
}

const getUserReceipts = async (req) => {

    console.log(req.uuid);

    const userInfoPrompt = `
    SELECT * FROM receipts
    WHERE buyer = '${req.uuid}'
    `

    const [rows, fields] = await pool.query(userInfoPrompt);

    return rows;
}

route.get("/getData", verifyToken, async function(req, res) {
    pool = await connectToPool();

    let data;

    try {
        const userInfo = await getUserInfo(req);
        const userReceipts = await getUserReceipts(req);

        data = {
            userInfo: userInfo,
            userReceipts: userReceipts
        }

        res.json(data).status(200);
    } catch (e) {
        console.log("error fetching data");
        console.log(e);
        res.sendStatus(404);
    }

    return;
})

module.exports = route;