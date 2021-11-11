var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/categories", async function (req, res) {
  try {
    const results = await db("SELECT * FROM categories ORDER BY id ASC;");

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
    const { category_id, name, image, color, season } = req.body;
    await db(
      `INSERT INTO items (category_id, name, image, color, season) VALUES ("${category_id}","${name}", "${image}","${color}","${season}");`
    );
    const results = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(201).send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/items/:item_id", async function (req, res) {
  try {
    await db(`DELETE FROM items WHERE id = ${+req.params.item_id};`);
    const results = await db("SELECT * FROM items ORDER BY id ASC;");
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
