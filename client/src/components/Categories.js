import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";
import React, { useState, useEffect } from "react";
import Category from "./Category.js";

export default function Categories({ categories, onChange, checked }) {
  const [displayCategories, setDisplayCategories] = useState(false);

  const handleIconClick = () => {
    setDisplayCategories(!displayCategories);
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
              checked={() => checked(category.id)}
              category={category}
              key={category.id}
              onChange={() => onChange(category.id)}
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
