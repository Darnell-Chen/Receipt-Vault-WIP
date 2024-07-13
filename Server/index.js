var mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3001;

const poolConnection = require("./db");


app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


const startPool = async () => {
    try {
        let connection = await poolConnection();
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ", result)
                    try {
                        createNewDB(connection);
                    } catch (e) {
                        console.log("error attempting to create database for Receipt Vault.");
                    }
            })
    } catch (e) {
        console.log("error while trying to connect to initialize DB connection: " + e);
    }
}


const createNewDB = async (connection) => {
    connection.query("CREATE DATABASE IF NOT EXIST rv_accounts");

    connection.query("DROP DATABASE rv_accounts");
}

startPool();
