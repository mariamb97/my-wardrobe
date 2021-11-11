require("dotenv").config();
const mysql = require("mysql");

const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "my_wardrobe",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/create.sql").toString();

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(
      "Tables creations `categories`, `items`, `colors`, and `seasons` were successful. 14 rows were added to `categories`, 12 rows were added to `colors`, and 4 rows were added to `seasons`"
    );

    console.log("Closing...");
  });

  con.end();
});
