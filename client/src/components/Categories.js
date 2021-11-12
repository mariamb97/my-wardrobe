import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";
import React, { useState, useEffect } from "react";
import Category from "./Category.js";

export default function Categories({ categories }) {
  const [displayCategories, setDisplayCategories] = useState(false);
  const [checkedState, setCheckedState] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [test, setTest] = useState("");

  const handleIconClick = () => {
    setDisplayCategories(!displayCategories);
  };

  useEffect(() => {
    getFilteredItems();
  }, [checkedState]);

  const handleChangeChecked = (categoryId) => {
    console.log(categoryId);
    if (!checkedState[categoryId]) {
      setCheckedState((state) => ({ ...state, [categoryId]: true }));
    } else {
      setCheckedState((state) => ({ ...state, [categoryId]: false }));
    }
  };

  const getFilteredItems = () => {
    console.log(checkedState);
    let categoriesPath = "";
    for (const property in checkedState) {
      if (checkedState[property]) {
        categoriesPath += `categories[]=${property}&`;
      }
    }
    setTest(categoriesPath);
    fetch(`/api/items/?${categoriesPath}`)
      .then((response) => response.json())
      .then((items) => {
        setFilteredItems(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {displayCategories ? (
          <img src={CloseSortIcon} onClick={handleIconClick} />
        ) : (
          <img src={SortIcon} onClick={handleIconClick} />
        )}
      </div>
      {displayCategories &&
        categories.map((category) => {
          return (
            <Category
              checked={!!checkedState[category.id]}
              category={category}
              key={category.id}
              onChange={() => handleChangeChecked(category.id)}
            ></Category>
          );
        })}
      {displayCategories && (
        <div>
          Looking for: <div>{/* <div> {filterCategory}</div> */}</div>
        </div>
      )}
    </div>
  );
}
