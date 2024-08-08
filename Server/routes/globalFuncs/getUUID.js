const connectToPool = require('../../db');

// Ignoring the function below this, which assumes that the user passes us the UUID
// this function fetches the UUID form the db using the email decoded from the JWT
// This is more secure, so we'll be using this instead
const getUUID = async (req, res, next) => {
    const pool = await connectToPool();

    if (req.user == null) {
        res.sendStatus(400);
        return;
    }

    const getAccount = `
        SELECT * FROM accounts
        WHERE email=?
    `;

    const [rows, fields] = await pool.query(getAccount, [req.user]);

    if (rows.length != 1) {
        console.log("more or less than 1 row returned when looking for user in table \'accounts\'");
        res.sendStatus(500);
        return;
    }

    req.uuid = rows[0].uuid;
    next();
}


// basic function to ensure UUID was passed via the headers
// and that it's a valid UUID that corresponds with an actual account
// Note: this might not be the best method as any malicious users may decide to pass someone else's UUID
// but since this is prototype, I won't care to fix it.
// const verifyUUID = async (req, res, next) => {

//     if (req.header('uuid') == null) {
//         res.sendStatus(404);
//         return;
//     }

//     const pool = await connectToPool();

//     const checkUUID = `
//     SELECT * FROM accounts
//     WHERE uuid=?
//     `;

//     const [rows, fields] = await pool.query(checkUUID, [req.header('uuid')]);

//     if (rows.length != 1) {
//         res.sendStatus(403);
//         return;
//     }

//     next();
// }

module.exports = getUUID;