const pgPromise = require('pg-promise');
const dbConfig = require('../config/db.config');

const pgp = pgPromise({
    error(err) {
        console.error('DB error:', err.message);
    }
});

const db = pgp(dbConfig);

module.exports = db;
