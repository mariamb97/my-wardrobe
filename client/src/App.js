import "./App.css";
import React, { useEffect, useState } from "react";
import FilterList from "./components/FilterList.js";
import Item from "./components/Item.js";

function App() {
  const [colors, setColors] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displayFilterList, setDisplayFilterList] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [checkedStateCategories, setCheckedStateCategories] = useState({});
  const [checkedStateColors, setCheckedStateColors] = useState({});
  const [checkedStateSeasons, setCheckedStateSeasons] = useState({});
  // const [checkedStateFilters, setCheckedStateFilters] = useState({
  //   categories: {},
  //   colors: {},
  //   seasons: {}
  // });
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
  }, [checkedStateCategories, checkedStateColors, checkedStateSeasons]);

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

  const getFilteredItems = () => {
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
    fetch(`/api/items/?${filterPath}`)
      .then((response) => response.json())
      .then((items) => {
        setFilteredItems(items);
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
    setDisplayFilterList(!displayFilterList);
  };

  // const handleChangeCheckedCategories = (categoryId) => {
  //   const { categories } = checkedStateFilters;
  //   if (!checkedStateFilters[categoryId]) {
  //     setCheckedStateFilters((state) => ({
  //       ...state[categories],
  //       categories: {
  //         [categoryId]: true,
  //       },
  //     }));
  //   } else {
  //     setCheckedStateFilters((state) => ({
  //       ...state[categories],
  //       categories: {
  //         [categoryId]: false,
  //       },
  //     }));
  //   }
  // };

  const handleChangeCheckedCategories = (categoryId) => {
    if (!checkedStateCategories[categoryId]) {
      setCheckedStateCategories((state) => ({ ...state, [categoryId]: true }));
    } else {
      setCheckedStateCategories((state) => ({ ...state, [categoryId]: false }));
    }
  };

  const handleChangeCheckedColors = (colorId) => {
    if (!checkedStateColors[colorId]) {
      setCheckedStateColors((state) => ({ ...state, [colorId]: true }));
    } else {
      setCheckedStateColors((state) => ({ ...state, [colorId]: false }));
    }
  };

  const handleChangeCheckedSeasons = (seasonId) => {
    if (!checkedStateSeasons[seasonId]) {
      setCheckedStateSeasons((state) => ({ ...state, [seasonId]: true }));
    } else {
      setCheckedStateSeasons((state) => ({ ...state, [seasonId]: false }));
    }
  };

  const addItem = async () => {
    const { category_id, color_id, season_id, image } = input;

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
          // {
          //   category_id: input["category_id"],
          //   color_id: input["color_id"],
          //   season_id: input["season_id"],
          //   image: input["image"],
          // }
          input
        ),
      });
      const data = await response.json();
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) => {
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
    fetch(`/api/items/${id}/?${filterPath}`, {
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
          <FilterList
            handleIconClick={handleIconClick}
            displayFilterList={displayFilterList}
            categories={categories}
            handleChangeCheckedCategories={(categoryId) =>
              handleChangeCheckedCategories(categoryId)
            }
            colors={colors}
            handleChangeCheckedColors={(colorId) =>
              handleChangeCheckedColors(colorId)
            }
            seasons={seasons}
            handleChangeCheckedSeasons={(seasonId) =>
              handleChangeCheckedSeasons(seasonId)
            }
          ></FilterList>
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
