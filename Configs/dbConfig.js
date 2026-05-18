const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "schoolmanagement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Db Connection is Failed");
    console.log(err);
  } else {
    console.log("Db Connection SuccesFull");
    connection.release();
  }
});

module.exports = db.promise();
