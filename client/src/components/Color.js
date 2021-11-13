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
          name={color.name}
          onChange={handleChangeCheckedColors}
        />
        <label>{color.name}​</label>
      </div>
    </div>
  );
}
