import React from "react";

export default function Category({
  displayFilterList,
  category,
  handleChangeCheckedCategories,
  // checked,
}) {
  return (
    <div className={!displayFilterList ? "hidden-content-list" : ""}>
      <input
        type="checkbox"
        name="categories"
        value={category.id}
        onChange={handleChangeCheckedCategories}
        //  value={checked}
      />
      <label>{category.name}​</label>
      {/* <span className="category" onClick={() => onClick(category.id)}>
        {category.name}​
      </span> */}
    </div>
  );
}
