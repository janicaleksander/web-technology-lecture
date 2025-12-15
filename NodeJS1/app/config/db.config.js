module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 30000,
};
