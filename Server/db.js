require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

const connectToPool = async () => {
    if (!pool) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.MYSQL_PASSWORD,
        });

        try {
            await connection.query('CREATE DATABASE IF NOT EXISTS receipt_vault');
            connection.end()
        } catch {
            console.log("Problem creating DB");
        }

        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'receipt_vault',
            password: process.env.MYSQL_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

        // we'll instantiate initial tables
        await createTables();
    }
    return pool;
}


const createTables = async () => {
    try {
        const makeAccountsTBL = `  
        CREATE TABLE IF NOT EXISTS accounts (
            uuid CHAR(36) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (uuid)
        );
        `;

        const makeReceiptsTBL = `
        CREATE TABLE IF NOT EXISTS receipts (
            receiptID INT NOT NULL AUTO_INCREMENT,
            store VARCHAR(69) NOT NULL,
            items JSON NOT NULL,
            total INT NOT NULL,
            buyer CHAR(36) NOT NULL,
            PRIMARY KEY (receiptID),
            FOREIGN KEY (buyer) REFERENCES accounts(uuid)
        );`

        const [accountRows, accountFields] = await pool.query(makeAccountsTBL);
        const [receiptRows, receiptFields] = await pool.query(makeReceiptsTBL);

        console.log('DB ready');

    } catch (e) {
        console.log("Problems occured while creating initial tables");
    }
}

module.exports = connectToPool;