import SortIcon from "./images/sort_icon.png";
import CloseSortIcon from "./images/close_sort_icon.png";
import "./App.css";
import React, { useEffect, useState } from "react";
import Category from "./components/Category.js";
import Item from "./components/Item.js";

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [displayCategories, setDisplayCategories] = useState(false);
  const [input, setInput] = useState({
    category_id: 1,
    image: "",
    color: "",
    season: "",
  });

  useEffect(() => {
    getCategories();
    getItems();
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

  const { category_id, image, color, season } = input;

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
            image: input["image"],
            color: input["color"],
            season: input["season"],
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
          name="color"
          value={input.color}
          onChange={(event) => handleInputChange(event)}
        >
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="white">White</option>
          <option value="brown">Brown</option>
        </select>
        <label>Season:</label>
        <select
          name="season"
          value={input.season}
          onChange={(event) => handleInputChange(event)}
        >
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
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
        <div id="categoriesContainer">
          {displayCategories &&
            categories.map((category) => {
              return (
                <Category
                  category={category}
                  key={category.id}
                  onClick={() => filterItems(category.id)}
                ></Category>
              );
            })}
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
