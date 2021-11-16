import React, { useState } from "react";

export default function Category({
  category,
  handleChangeCheckedCategories,
  isChecked,
}) {
  return (
    <div>
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
    </div>
  );
}
