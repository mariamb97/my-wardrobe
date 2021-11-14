import React, { useState } from "react";
import Category from "./Category.js";
import "./Categories.css";

export default function Categories({
  categories,
  handleChangeCheckedCategories,
}) {
  const [displayFilterListCategories, setDisplayFilterListCategories] =
    useState(false);
  const [mouseOverFilterCategories, setMouseOverFilterCategories] =
    useState(false);

  const handleClickDisplayFilterCategories = () => {
    setDisplayFilterListCategories(!displayFilterListCategories);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterCategories}
        onMouseEnter={() => setMouseOverFilterCategories(true)}
        onMouseLeave={() => setMouseOverFilterCategories(false)}
        className={
          !displayFilterListCategories
            ? mouseOverFilterCategories
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        Categories
      </button>
      <div
        className={!displayFilterListCategories ? "collapsible-content" : ""}
      >
        {categories.map((category) => {
          return (
            <Category
              category={category}
              key={`category:${category.id}`}
              handleChangeCheckedCategories={() =>
                handleChangeCheckedCategories(category.id)
              }
            ></Category>
          );
        })}
      </div>
    </div>
  );
}
