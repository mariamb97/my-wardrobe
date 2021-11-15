import React, { useState } from "react";

export default function Category({
  category,
  handleChangeCheckedCategories,
  isChecked,
}) {
  // const [mouseOverCategoryInput, setMouseOverCategoryInput] = useState(false);

  return (
    <div
    // onMouseEnter={() => setMouseOverCategoryInput(true)}
    // onMouseLeave={() => setMouseOverCategoryInput(false)}
    >
      <label className="container-checkboxes">
        {category.name}
        <input
          type="checkbox"
          id={`category:${category.id}`}
          checked={isChecked}
          onChange={handleChangeCheckedCategories}
        />
        <span className="checkmark"></span>
      </label>
      {/* <span className="category" onClick={() => onClick(category.id)}>
        {category.name}​
      </span> */}
    </div>
  );
}
