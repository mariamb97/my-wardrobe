import React from "react";

export default function Category({ category, onClick }) {
  return (
    <div>
      <span className="category" onClick={() => onClick(category.id)}>
        {category.name}​
      </span>
    </div>
  );
}
