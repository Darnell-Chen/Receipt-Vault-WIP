const connectToPool = require("../db");
const app = require('express');
const connection = require("../db");

const route = app.Router();

route.post("/register", function(req, res) {
    console.log(res.body);
})

module.exports = route;