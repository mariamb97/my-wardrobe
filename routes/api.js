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
    const { categories } = req.query;

    console.log(req.query);

    let results = null;

    console.log(categories);
    if (!categories || !categories.length) {
      results = await db("SELECT * FROM items ORDER BY id ASC;");
    } else {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE category_id IN (${categoriesJoined}) ORDER BY id ASC;`
      );
    }

    res.send(results.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/colors", async function (req, res) {
  try {
    const results = await db("SELECT * FROM colors ORDER BY id ASC;");
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/seasons", async function (req, res) {
  try {
    const results = await db("SELECT * FROM seasons ORDER BY id ASC;");
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
    const { category_id, color_id, season_id, image } = req.body;
    await db(
      `INSERT INTO items (category_id, color_id, season_id, image) VALUES ("${category_id}","${color_id}","${season_id}", "${image}");`
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
    // const results = await db("SELECT * FROM items ORDER BY id ASC;");
    // res.status(200).send(results.data);
    const { categories } = req.query;

    let results = null;

    if (!categories || !categories.length) {
      results = await db("SELECT * FROM items ORDER BY id ASC;");
    } else {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE category_id IN (${categoriesJoined}) ORDER BY id ASC;`
      );
    }

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
