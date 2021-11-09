var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/categories", function (req, res) {
  try {
    const results = db("SELECT * FROM categories ORDER BY id ASC;");

    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/items", async function (req, res) {
  try {
    const results = await db("SELECT * FROM items ORDER BY id ASC;");
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/categories/:id/items", async function (req, res) {
  try {
    const results = await db(
      `SELECT * FROM items WHERE category_id=${+req.params.id} ORDER BY id ASC;`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/items", async function (req, res) {
  try {
    const { category_id, name, image, color, characteristic } = req.body;
    await db(
      `INSERT INTO items (category_id, name, image, color, characteristic) VALUES ("${category_id}","${name}", "${image}","${color}","${characteristic}");`
    );
    const results = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(201).send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
