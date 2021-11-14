import React, { useState } from "react";
import "./AddItemForm.css";

export default function AddItemForm({
  categories,
  colors,
  seasons,
  checkedStateCategories,
  checkedStateColors,
  checkedStateSeasons,
  setFilteredItems,
}) {
  const [input, setInput] = useState({
    category_id: 1,
    color_id: 1,
    season_id: 1,
    image: "",
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  const addItem = async () => {
    // let filterPath = "";

    const filterQueryString = Object.keys(checkedStateCategories)
      .filter((category) => checkedStateCategories[category])
      .map((category) => `categories[]=${category}`)
      .concat(
        Object.keys(checkedStateColors)
          .filter((color) => checkedStateColors[color])
          .map((color) => `colors[]=${color}`)
      )
      .concat(
        Object.keys(checkedStateSeasons)
          .filter((season) => checkedStateSeasons[season])
          .map((season) => `seasons[]=${season}`)
      )
      .join("&");

    // for (const property in checkedStateCategories) {
    //   if (checkedStateCategories[property]) {
    //     filterPath += `categories[]=${property}&`;
    //   }
    // }
    // for (const property in checkedStateColors) {
    //   if (checkedStateColors[property]) {
    //     filterPath += `colors[]=${property}&`;
    //   }
    // }
    // for (const property in checkedStateSeasons) {
    //   if (checkedStateSeasons[property]) {
    //     filterPath += `seasons[]=${property}&`;
    //   }
    // }
    try {
      const { category_id, color_id, season_id, image } = input;
      const response = await fetch(`/api/items/?${filterQueryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          //  input
          {
            category_id: category_id,
            color_id: color_id,
            season_id: season_id,
            image: image,
          }
        ),
      });
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-item-form">
      <label id="input-url-label">
        Add image URL:
        <input
          value={input.image}
          name="image"
          onChange={(event) => handleInputChange(event)}
        />
      </label>
      <label id="input-category-label">
        Select a category:
        <select
          name="category_id"
          value={input.category_id}
          id="input-category"
          onChange={(event) => handleInputChange(event)}
        >
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </label>
      <label id="input-color-label">
        Color:
        <select
          name="color_id"
          value={input.color_id}
          id="input-color"
          onChange={(event) => handleInputChange(event)}
        >
          {colors.map((color) => {
            return (
              <option value={color.id} key={color.id}>
                {color.name}
              </option>
            );
          })}
        </select>
      </label>
      <label id="input-season-label">
        Season:
        <select
          name="season_id"
          value={input.season_id}
          id="input-season"
          onChange={(event) => handleInputChange(event)}
        >
          {seasons.map((season) => {
            return (
              <option value={season.id} key={season.id}>
                {season.name}
              </option>
            );
          })}
        </select>
      </label>
      <button id="submit-button">Submit</button>
    </form>
  );
}
