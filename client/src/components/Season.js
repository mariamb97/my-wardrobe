import React from "react";

export default function Season({
  season,
  handleChangeCheckedSeasons,
  isChecked,
}) {
  return (
    <div>
      <label className="container-checkboxes">
        {season.name}
        <input
          type="checkbox"
          id={`season:${season.id}`}
          checked={isChecked}
          onChange={handleChangeCheckedSeasons}
        />
        <span className="checkmark"></span>​
      </label>
    </div>
  );
}
