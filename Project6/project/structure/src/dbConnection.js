const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

module.exports = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};