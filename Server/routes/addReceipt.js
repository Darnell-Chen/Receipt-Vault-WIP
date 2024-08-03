const verifyUUID = require('./globalFuncs/verifyUUID');

const express = require('express');
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");
const connectToPool = require("../db");
const checkUUID = require("./globalFuncs/verifyUUID");

let pool;
const route = express.Router();

const manualInput = async (req, res) => {
    const query = `
    INSERT INTO receipts (store, total, buyer, type, receipt_ts)
    VALUES (?, ?, ?, ?, ?, ?)
    `

    const [rows, fields] = await pool.query(query, []);

    console.log(rows);
}

route.post("/postReceipt", verifyToken, verifyUUID, async (req, res) => {

    pool = await connectToPool();

    try {
        const type = req.header('dataType');
        console.log("Data Type: " + req.header('dataType'));

        if (type == 'mindee') {
            console.log("from mindee");
            console.log(req.body);

        } else if (type == 'manual') {
            console.log("manual");
            console.log(req.body);

        } else {
            res.sendStatus(400);
            return;
        }

    } catch (e) {
        console.log("file: addReceipt - possibly no/incorrect header for receipt/bill type found: " + e)
        res.sendStatus(400);
        return;
    }

    console.log("reached");
    res.sendStatus(200);
    return;
})

module.exports = route;