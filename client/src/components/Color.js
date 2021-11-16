import React from "react";

export default function Color({ color, handleChangeCheckedColors, isChecked }) {
  return (
    <div>
      <label className="container-checkboxes">
        {color.name}
        <input
          type="checkbox"
          id={`color:${color.id}`}
          checked={isChecked}
          onChange={handleChangeCheckedColors}
        />
        <span className="checkmark"></span>​
      </label>
    </div>
  );
}
