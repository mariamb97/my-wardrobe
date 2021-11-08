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
  database: DB_NAME || "wardrobe",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/create.sql").toString();
  // "DROP TABLE if exists categories; CREATE TABLE caterories (id INT NOT NULL AUTO_INCREMENT, name varchar(100) NOT NULL, PRIMARY KEY (`id`)); DROP TABLE if exists categories; CREATE TABLE `products` (id INT NOT NULL AUTO_INCREMENT, category-id INT NOT NULL,
  //   name varchar(100) NOT NULL AUTO_INCREMENT,
  //   image varchar(400) NOT NULL AUTO_INCREMENT,
  //   color varchar(100) NOT NULL,
  //   characteristic varchar(100) NOT NULL,
  //   PRIMARY KEY (`id`)
  // ); ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `items` was successful!");

    console.log("Closing...");
  });

  con.end();
});
