const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectToPool = require("../db");
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");

const route = express.Router();
route.use(express.json());

let pool;

route.post("/login", async function(req, res) {
    console.log(`login route reached for user: ${req.body.email}`)

    pool = await connectToPool();
    const conn = await pool.getConnection();

    const loginValid = `SELECT password 
                        FROM accounts
                        WHERE email = ?`;

    let rows, fields;
    
    try {
        [rows, fields] = await conn.execute(loginValid, [req.body.email]);
        conn.release();
    } catch (e) {
        conn.release();
        console.log(e);
        res.sendStatus(404);
        return;
    }

    if (rows.length > 1 || rows.length < 1) {
        res.sendStatus(404);
        return;
    }

    const validLogin = await bcrypt.compare(req.body.password, rows[0].password);
    
    if (validLogin) {
        const token = createToken(req.body.email);
        res.status(200).json({token: token});
        return;
    }

    // better to be safe than sorry
    res.sendStatus(404);
    return;
})

module.exports = route;
