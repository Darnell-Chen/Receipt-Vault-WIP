const express = require('express');
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");
const connectToPool = require("../db");

let pool;
const route = express.Router();

route.post("/postReceipt", verifyToken, async (req, res) => {
    pool = await connectToPool();

    try {
        const type = req.header('dataType');

        if (type == 'mindeeParser') {
            console.log("from mindee");
        } else if (type == 'manualInput') {
            console.log("manual input");
        }

    } catch (e) {
        console.log("file: addReceipt - possibly no header for receipt/bill type found: " + e)
    }
})