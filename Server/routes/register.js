const connectToPool = require("../db");
const express = require('express');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const route = express.Router();
route.use(express.json());

let pool;

const checkUserRegistered = async (req, res, next) => {
    pool = await connectToPool();
    const conn = await pool.getConnection();

    const findUser = `SELECT email, password 
                        FROM accounts
                        WHERE 'email' = ?`

    const [rows, fields] = await conn.query(findUser, [req.body.email]);

    conn.release();

    if (rows.length !== 0) {
        res.sendStatus(400);
        return;
    }

    next();
}

const registerUser = async (req) => {
    const conn = await pool.getConnection();

    const uuid = uuidv4();
    const {fname, lname, email, password} = req.body;

    const hashedPW = await bcrypt.hash(password, 10);

    const createUser = `INSERT into accounts (uuid, firstname, lastname, email, password, monthly, yearly, all_time)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    
    try {
        const [rows, fields] = await conn.execute(createUser, [uuid, fname, lname, email, hashedPW, 0, 0, 0]);
    } catch (e){
        console.log(e);
        return false;
    }

    conn.release();

    return true;
}

route.post("/register", checkUserRegistered, async function(req, res) {
    const reg_result = await registerUser(req);
    (reg_result) ? res.sendStatus(200) : res.sendStatus(400);
})

module.exports = route;