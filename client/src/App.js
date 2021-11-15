import "./App.css";
import React, { useEffect, useState } from "react";
import FilterList from "./components/FilterList.js";
import Item from "./components/Item.js";
import AddItemForm from "./components/AddItemForm";

function App() {
  const [colors, setColors] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [checkedStateCategories, setCheckedStateCategories] = useState({});
  const [checkedStateColors, setCheckedStateColors] = useState({});
  const [checkedStateSeasons, setCheckedStateSeasons] = useState({});
  // const [checkedStateFilters, setCheckedStateFilters] = useState({
  //   categories: {},
  //   colors: {},
  //   seasons: {}
  // });

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
    setCheckedStateCategories((prevCheckedStateCategories) => {
      let newCheckedStateCategories;
      if (!prevCheckedStateCategories[categoryId]) {
        newCheckedStateCategories = {
          ...prevCheckedStateCategories,
          [categoryId]: true,
        };
      } else {
        newCheckedStateCategories = {
          ...prevCheckedStateCategories,
          [categoryId]: false,
        };
      }
      console.log(newCheckedStateCategories);
      return newCheckedStateCategories;
    });
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

  // const refreshItems = () => {
  //   return [];
  // };

  const handleClickResetForm = (event) => {
    event.preventDefault();
    setCheckedStateCategories({});
    setCheckedStateColors({});
    setCheckedStateSeasons({});
  };

  return (
    <div>
      <h1>Maria's closet</h1>
      <AddItemForm
        categories={categories}
        colors={colors}
        seasons={seasons}
        checkedStateCategories={checkedStateCategories}
        checkedStateColors={checkedStateColors}
        checkedStateSeasons={checkedStateSeasons}
        setFilteredItems={setFilteredItems}
      />

      <div id="filter-and-items-container">
        <div id="filterContainer">
          <FilterList
            categories={categories}
            checkedStateCategories={checkedStateCategories}
            handleChangeCheckedCategories={(categoryId) =>
              handleChangeCheckedCategories(categoryId)
            }
            colors={colors}
            checkedStateColors={checkedStateColors}
            handleChangeCheckedColors={(colorId) =>
              handleChangeCheckedColors(colorId)
            }
            seasons={seasons}
            checkedStateSeasons={checkedStateSeasons}
            handleChangeCheckedSeasons={(seasonId) =>
              handleChangeCheckedSeasons(seasonId)
            }
            handleClickResetForm={handleClickResetForm}
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
