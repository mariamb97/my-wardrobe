import React from "react";

export default function Category({ category, handleChangeCheckedCategories }) {
  return (
    <div>
      <input
        type="checkbox"
        id={`category:${category.id}`}
        onChange={handleChangeCheckedCategories}
      />
      <label htmlFor={category.name}>{category.name}​</label>
      {/* <span className="category" onClick={() => onClick(category.id)}>
        {category.name}​
      </span> */}
    </div>
  );
}
