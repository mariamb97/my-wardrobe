import React from "react";

export default function Color({
  displayFilterList,
  color,
  handleChangeCheckedColors,
}) {
  return (
    <div>
      <div className={!displayFilterList ? "hidden-content-list" : ""}>
        <input
          type="checkbox"
          id={`color:${color.id}`}
          onChange={handleChangeCheckedColors}
        />
        <label>{color.name}​</label>
      </div>
    </div>
  );
}
