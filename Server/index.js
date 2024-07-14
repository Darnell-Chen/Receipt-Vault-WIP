const express = require('express');

const createAccount = require("./routes/createAccount");

const app = express();
const port = 3001;
app.use(express.json())

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

app.use(createAccount);