import "./App.css";
import React, { useEffect, useState } from "react";
import Categories from "./components/Categories.js";
import Item from "./components/Item.js";

function App() {
  const [colors, setColors] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [input, setInput] = useState({
    category_id: 1,
    color_id: 1,
    season_id: 1,
    image: "",
  });

  useEffect(() => {
    getColors();
    getSeasons();
    getCategories();
    getFilteredItems();
  }, [checkedState]);

  const getCategories = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getColors = () => {
    fetch("/api/colors")
      .then((response) => response.json())
      .then((colors) => {
        setColors(colors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSeasons = () => {
    fetch("/api/seasons")
      .then((response) => response.json())
      .then((seasons) => {
        setSeasons(seasons);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem();
  };

  const handleChangeChecked = (categoryId) => {
    console.log(categoryId);
    if (!checkedState[categoryId]) {
      setCheckedState((state) => ({ ...state, [categoryId]: true }));
    } else {
      setCheckedState((state) => ({ ...state, [categoryId]: false }));
    }
  };

  const getFilteredItems = () => {
    let categoriesPath = "";
    for (const property in checkedState) {
      if (checkedState[property]) {
        categoriesPath += `categories[]=${property}&`;
      }
    }
    fetch(`/api/items/?${categoriesPath}`)
      .then((response) => response.json())
      .then((items) => {
        setFilteredItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const { category_id, color_id, season_id, image } = input;

  const addItem = async () => {
    try {
      const response = await fetch("/api/items", {
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
          // input
        ),
      });
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    fetch(`/api/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setFilteredItems(data));
  };

  return (
    <div>
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

      <div id="container">
        <div id="filterContainer">
          <Categories
            categories={categories}
            checked={(categoryId) => !!checkedState[categoryId]}
            onChange={(categoryId) => handleChangeChecked(categoryId)}
          ></Categories>
        </div>
        <div id="itemsContainer">
          {filteredItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onClick={(id) => deleteItem(id)}
              ></Item>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
