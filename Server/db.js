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
            await connection.query('CREATE DATABASE IF NOT EXISTS rv_accounts');
        } catch {
            console.log("Problem creating DB or Tables");
        }

        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'rv_accounts',
            password: process.env.MYSQL_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

        // we'll instantiate initial DB
    }
    return pool;
}


const createTables = async () => {
    const connection = await pool.query(
        
    );
}

module.exports = connectToPool;