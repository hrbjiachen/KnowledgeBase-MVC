const mysql = require("mysql2");
require("dotenv/config");

const { HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  //socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
});

module.exports = pool.promise();
