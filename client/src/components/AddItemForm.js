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
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  const addItem = async () => {
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

    try {
      const { category_id, color_id, season_id, image } = input;
      const response = await fetch(`/api/items/?${filterQueryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_id: category_id,
          color_id: color_id,
          season_id: season_id,
          image: image,
        }),
      });
      const data = await response.json();
      setFilteredItems(data);
      setSubmitMessage("Your item has been added successfully!")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="add-item-form">
        <div>
          <label id="input-url-container">
            Add image URL:
            <input
              type="url"
              name="image"
              value={input.image}
              id="input-url"
              onChange={(event) => handleInputChange(event)}
              required
            />
          </label>
        </div>

        <div>
          <label id="input-category-container">
            Select a category:
            <select
              name="category_id"
              value={input.category_id}
              id="input-category"
              onChange={(event) => handleInputChange(event)}
              required
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
        </div>

        <div>
          {" "}
          <label className="item-select" id="input-color-container">
            Color:
            <select
              name="color_id"
              value={input.color_id}
              id="input-color"
              onChange={(event) => handleInputChange(event)}
              required
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
          <label id="input-season-container">
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
        </div>
        <button id="submit-button">Submit</button>
      </form>
      {submitMessage &&
        <div id="submit-message"> {submitMessage}</div>
      }
    </div>
  );
}
