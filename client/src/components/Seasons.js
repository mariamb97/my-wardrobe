import React from "react";
import Season from "./Season.js";

export default function Seasons({
  displayFilterList,
  seasons,
  handleChangeCheckedSeasons,
}) {
  return (
    <div>
      <h6 className={!displayFilterList ? "hidden-content-list" : ""}>
        Seasons:{" "}
      </h6>
      {seasons.map((season) => {
        return (
          <Season
            season={season}
            key={season.id}
            handleChangeCheckedSeasons={() =>
              handleChangeCheckedSeasons(season.id)
            }
            displayFilterList={displayFilterList}
          ></Season>
        );
      })}
    </div>
  );
}
