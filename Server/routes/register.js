const connectToPool = require("../db");
const express = require('express');
const {v4: uuidv4} = require('uuid');

const route = express.Router();
route.use(express.json());

const pool = pool.connectToPool();

route.post("/register", function(req, res) {
    console.log(req.body);
    console.log("reached /register");
    res.sendStatus(200);
})


const checkUserRegistered = async (req, res, next) => {
    const conn = await pool.getConnection();

    const findUser = `SELECT email, password 
                        FROM accounts
                        WHERE 'email' = ?`

    const [rows, fields] = await conn.query(findUser, [req.body.email]);

    conn.end();

    if (rows.length !== 0) {
        return res.sendStatus(400);
    }

    next();
}

const registerUser = async (req) => {
    const conn = await pool.getConnection();

    const uuid = uuidv4();
    const {fname, lname, email, password} = req.body;

    const createUser = `INSERT into accounts (uuid, firstname, lastname, email, password)
                        VALUES (?, ?, ?, ?, ?)`
    
    const [rows, fields] = await connection.execute(createUser, [uuid, fname, lname, email, password]);

    console.log(rows);
}

module.exports = route;