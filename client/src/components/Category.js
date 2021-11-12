import React from "react";

export default function Category({ category, onChange, checked }) {
  return (
    <div>
      <input
        type="checkbox"
        name={category.name}
        value={checked}
        onChange={() => onChange(category.id)}
      />
      <label>{category.name}​</label>
      {/* <span className="category" onClick={() => onClick(category.id)}>
        {category.name}​
      </span> */}
    </div>
  );
}
