const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: `localhost`,
  port: 3000,
  user: `root`,
  password: `password`,
  database: `employeetracker_db`
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to server!")
});

module.exports = connection