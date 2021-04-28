require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  port : process.env.DB_PORT,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  multipleStatements : true,
  decimalNumbers : true
});

module.exports = connection;
