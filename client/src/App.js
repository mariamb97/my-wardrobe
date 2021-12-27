import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar.js";
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
  const [displayFilterList, setDisplayFilterList] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false)

  // this is an idea I had, instead of storing the 3 checkedStates in 3 different empty objects, do it in only one object containing that properties
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
    let filterQueryString = "";
    for (const property in checkedStateCategories) {
      if (checkedStateCategories[property]) {
        filterQueryString += `categories[]=${property}&`;
      }
    }
    for (const property in checkedStateColors) {
      if (checkedStateColors[property]) {
        filterQueryString += `colors[]=${property}&`;
      }
    }
    for (const property in checkedStateSeasons) {
      if (checkedStateSeasons[property]) {
        filterQueryString += `seasons[]=${property}&`;
      }
    }

    fetch(`/api/items/?${filterQueryString}`)
      .then((response) => response.json())
      .then((items) => {
        setFilteredItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    let filterQueryString = "";
    for (const property in checkedStateCategories) {
      if (checkedStateCategories[property]) {
        filterQueryString += `categories[]=${property}&`;
      }
    }
    for (const property in checkedStateColors) {
      if (checkedStateColors[property]) {
        filterQueryString += `colors[]=${property}&`;
      }
    }
    for (const property in checkedStateSeasons) {
      if (checkedStateSeasons[property]) {
        filterQueryString += `seasons[]=${property}&`;
      }
    }
    fetch(`/api/items/${id}/?${filterQueryString}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setFilteredItems(data));
  };

  const handleIconClick = () => {
    setDisplayFilterList(!displayFilterList);
  };

  const handleClickResetForm = (event) => {
    event.preventDefault();
    setCheckedStateCategories({});
    setCheckedStateColors({});
    setCheckedStateSeasons({});
  };


  return (
    <div>
      <NavBar showAddItemForm={showAddItemForm} setShowAddItemForm={setShowAddItemForm} />
      {!showAddItemForm ?
        <div id="filter-and-items-container">
          <div className="items-container">
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
          <div className="filter-container">

            <FilterList
              displayFilterList={displayFilterList}
              handleIconClick={handleIconClick}
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
        </div> :
        <AddItemForm
          categories={categories}
          colors={colors}
          seasons={seasons}
          checkedStateCategories={checkedStateCategories}
          checkedStateColors={checkedStateColors}
          checkedStateSeasons={checkedStateSeasons}
          setFilteredItems={setFilteredItems}
        />
      }
    </div>
  );
}

export default App;
