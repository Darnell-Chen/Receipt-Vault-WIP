const connectToPool = require('../../db');

// basic function to ensure UUID was passed via the headers
// and that it's a valid UUID that corresponds with an actual account
// Note: this might not be the best method as any malicious users may decide to pass someone else's UUID
// but since this is prototype, I won't care to fix it.
const verifyUUID = async (req, res, next) => {

    if (req.header('uuid') == null) {
        res.sendStatus(404);
        return;
    }

    const pool = await connectToPool();

    const checkUUID = `
    SELECT * FROM accounts
    WHERE uuid=?
    `;

    const [rows, fields] = await pool.query(checkUUID, [req.header('uuid')]);

    if (rows.length != 1) {
        res.sendStatus(403);
        return;
    }

    next();
}

module.exports = verifyUUID;