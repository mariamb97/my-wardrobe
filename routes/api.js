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
    const { colors } = req.query;
    const { seasons } = req.query;

    let results = null;

    if (
      (!categories || !categories.length) &&
      (!colors || !colors.length) &&
      (!seasons || !seasons.length)
    ) {
      results = await db("SELECT * FROM items ORDER BY (created_at) DESC;");
    } else if (categories && colors && seasons) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (categories && colors) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (categories && seasons) {
      const categoriesJoined = categories.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (colors && seasons) {
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if ((!colors || !colors.length) && (!seasons || !seasons.length)) {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!seasons || !seasons.length)
    ) {
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!colors || !colors.length)
    ) {
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
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
    const { categories } = req.query;
    const { colors } = req.query;
    const { seasons } = req.query;

    let results = null;

    if (
      (!categories || !categories.length) &&
      (!colors || !colors.length) &&
      (!seasons || !seasons.length)
    ) {
      results = await db("SELECT * FROM items ORDER BY (created_at) DESC;");
    } else if (categories && colors) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (categories && seasons) {
      const categoriesJoined = categories.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (colors && seasons) {
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if ((!colors || !colors.length) && (!seasons || !seasons.length)) {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!seasons || !seasons.length)
    ) {
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!colors || !colors.length)
    ) {
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined} AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    }
    res.status(201).send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/items/:item_id", async function (req, res) {
  try {
    await db(`DELETE FROM items WHERE id = ${+req.params.item_id};`);
    const { categories } = req.query;
    const { colors } = req.query;
    const { seasons } = req.query;

    let results = null;

    if (
      (!categories || !categories.length) &&
      (!colors || !colors.length) &&
      (!seasons || !seasons.length)
    ) {
      results = await db("SELECT * FROM items ORDER BY (created_at) DESC;");
    } else if (categories && colors) {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (categories && seasons) {
      const categoriesJoined = categories.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (colors && seasons) {
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if ((!colors || !colors.length) && (!seasons || !seasons.length)) {
      const categoriesJoined = categories.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!seasons || !seasons.length)
    ) {
      const colorsJoined = colors.join(",");
      results = await db(
        `SELECT * FROM items WHERE (color_id) IN (${colorsJoined}) ORDER BY (created_at) DESC;`
      );
    } else if (
      (!categories || !categories.length) &&
      (!colors || !colors.length)
    ) {
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    } else {
      const categoriesJoined = categories.join(",");
      const colorsJoined = colors.join(",");
      const seasonsJoined = seasons.join(",");
      results = await db(
        `SELECT * FROM items WHERE (category_id) IN (${categoriesJoined}) AND (color_id) IN (${colorsJoined} AND (season_id) IN (${seasonsJoined}) ORDER BY (created_at) DESC;`
      );
    }

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
