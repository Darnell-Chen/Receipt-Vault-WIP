const express = require('express');
const connectToPool = require("../db");
const {createToken, verifyToken} = require("./globalFuncs/jwtFuncs");

const express = express();
const route = express.Router();

let pool;

route.get("/getData", verifyToken, function(req, res) {
    res.sendStatus(200);
    return;
})