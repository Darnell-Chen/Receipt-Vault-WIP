const express = require('express');
const cors = require('cors');

const register = require("./routes/register");
const login = require("./routes/login");
const getData = require("./routes/getData");

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

const poolConnection = require("./db");


app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


const startPool = async () => {
    try {
        const connection = await poolConnection()

        let [rows] = await connection.query(`SHOW DATABASES`);
        console.log(rows);
        
    } catch (e) {
        console.log("error while trying to connect to initialize DB connection: " + e);
    }
}

startPool();
app.use(register);
app.use(login);
app.use(getData);