const express = require('express');
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");
const connectToPool = require("../db");
const getUUID = require("./globalFuncs/getUUID");

let pool;
const route = express.Router();

const parseDate = (req) => {
    const date = new Date(req.body.date);
    req.body.date = date.toISOString().split('T')[0];

    console.log(date);

    // since we're here, we'll also go ahead and check the month and year to see if we should update monthly and yearly amounts
    const month = date.getMonth();
    const year = date.getFullYear();

    const currDate = new Date();

    req.addYear = 0;
    req.addMonth = 0;

    if (year == currDate.getFullYear()) {
        req.addYear = req.body.total;

        // has to be inside year since we have to make sure the month is of the same year first
        if (month == currDate.getMonth()) {
            req.addMonth = req.body.total;
        }
    }
}

route.post("/postReceipt", verifyToken, getUUID, async (req, res) => {

    try {
        parseDate(req);
    } catch (e) {
        console.log("error parsing date");
        console.log(e);
        res.sendStatus(400);
        return;
    }

    pool = await connectToPool();

    try {
        const type = req.header('Receipt-Type');
        console.log("Receipt Type: " + req.header('Receipt-Type'));

        if (type !== "mindee" && type !== "manual") {
            console.log("error defining type for receipt");
            res.sendStatus(400);
            return;
        } else {
            const receipt = req.body;

            const addReceipt = `
                INSERT INTO receipts (store, total, buyer, type, receipt_date, items)
                VALUES (?, ?, ?, ?, ?, ?)
            `

            let rows, fields;
            if (type == "manual") {

                // using execute here so that description doesn't get pre-processed
                [rows, fields] = await pool.execute(addReceipt, [receipt.store, receipt.total, req.uuid, "manual", receipt.date, {description: receipt.description}]);
            } else {
                [rows, fields] = await pool.execute(addReceipt, [receipt.store, receipt.total, req.uuid, "mindee", receipt.date, receipt.items]);
            }

            const updateAccount = `
                UPDATE accounts
                SET monthly = monthly + ?,
                    yearly = yearly + ?,
                    all_time = all_time + ?
                WHERE uuid=?
            `;

            const [r2, f2] = await pool.query(updateAccount, [req.addMonth, req.addYear, receipt.total, req.uuid]);

            res.sendStatus(200);
            return;
        }

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
        return;
    }

    console.log("reached");
    res.sendStatus(200);
    return;
})

module.exports = route;