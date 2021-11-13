import React from "react";

export default function Season({
  displayFilterList,
  season,
  handleChangeCheckedSeasons,
}) {
  return (
    <div className={!displayFilterList ? "hidden-content-list" : ""}>
      <input
        type="checkbox"
        // name="seasons"
        // value={season.id}
        onChange={handleChangeCheckedSeasons}
      />
      <label>{season.name}​</label>
    </div>
  );
}
