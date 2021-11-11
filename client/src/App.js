import SortIcon from "./images/sort_icon.png";
import CloseSortIcon from "./images/close_sort_icon.png";
import "./App.css";
import React, { useEffect, useState } from "react";
import Category from "./components/Category.js";
import Item from "./components/Item.js";

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [displayCategories, setDisplayCategories] = useState(false);
  const [filterCategory, setFilterCategory] = useState([]);
  const [itemsAreFiltered, setItemsAreFiltered] = useState(false);
  const [input, setInput] = useState({
    category_id: 1,
    color_id: 1,
    season_id: 1,
    image: "",
  });

  useEffect(() => {
    getCategories();
    getItems();
    getColors();
    getSeasons();
  }, []);

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

  const getItems = () => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((items) => {
        setItems(items);
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

  const handleIconClick = () => {
    setDisplayCategories(!displayCategories);
  };

  const { category_id, color_id, season_id, image } = input;

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
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
    fetch(`/api/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  const handleCategoryClick = (id, name) => {
    filterItems(id);
    showName(name);
  };

  const showName = (name) => {
    setFilterCategory(name);
  };

  const filterItems = (id) => {
    fetch(`/api/categories/${id}/items`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setItems(data));
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
      <div>
        {displayCategories ? (
          <img src={CloseSortIcon} onClick={handleIconClick} />
        ) : (
          <img src={SortIcon} onClick={handleIconClick} />
        )}
      </div>
      <div id="container">
        <div id="filterContainer">
          {displayCategories &&
            categories.map((category) => {
              return (
                <Category
                  category={category}
                  key={category.id}
                  onClick={() =>
                    handleCategoryClick(category.id, category.name)
                  }
                ></Category>
              );
            })}
          {displayCategories && (
            <div>
              Looking for:{" "}
              <div>
                <div> {filterCategory}</div>
              </div>
            </div>
          )}
        </div>
        <div id="itemsContainer">
          {items.map((item) => {
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
