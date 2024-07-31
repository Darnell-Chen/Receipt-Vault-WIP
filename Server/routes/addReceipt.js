const express = require('express');
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");
const connectToPool = require("../db");

let pool;
const route = express.Router();

route.post("/imageReceipt", verifyToken, async (req, res) => {
    pool = await connectToPool();
})