import React, { useState } from "react";

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
    // const { category_id, color_id, season_id, image } = input;

    let filterPath = "";
    for (const property in checkedStateCategories) {
      if (checkedStateCategories[property]) {
        filterPath += `categories[]=${property}&`;
      }
    }
    for (const property in checkedStateColors) {
      if (checkedStateColors[property]) {
        filterPath += `colors[]=${property}&`;
      }
    }
    for (const property in checkedStateSeasons) {
      if (checkedStateSeasons[property]) {
        filterPath += `seasons[]=${property}&`;
      }
    }
    try {
      const response = await fetch(`/api/items/?${filterPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            category_id: input["category_id"],
            color_id: input["color_id"],
            season_id: input["season_id"],
            image: input["image"],
          }
          //  input
        ),
      });
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add image URL: </label>
      <input
        value={input.image}
        name="image"
        id="input"
        onChange={(event) => handleInputChange(event)}
      />
      <label>Select a category:</label>
      <select
        name="category_id"
        value={input.category_id}
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
      <label>Color:</label>
      <select
        name="color_id"
        value={input.color_id}
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
      <label>Season:</label>
      <select
        name="season_id"
        value={input.season_id}
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
      <button id="submit-button">Submit</button>
    </form>
  );
}
