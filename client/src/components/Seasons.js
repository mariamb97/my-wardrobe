import React, { useState } from "react";
import Season from "./Season.js";

export default function Seasons({
  seasons,
  handleChangeCheckedSeasons,
  checkedStateSeasons,
}) {
  const [displayFilterListSeasons, setDisplayFilterListSeasons] =
    useState(false);
  const [mouseOverFilterSeasons, setMouseOverFilterSeasons] = useState(false);

  const handleClickDisplayFilterSeasons = () => {
    setDisplayFilterListSeasons(!displayFilterListSeasons);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterSeasons}
        onMouseEnter={() => setMouseOverFilterSeasons(true)}
        onMouseLeave={() => setMouseOverFilterSeasons(false)}
        className={
          !displayFilterListSeasons
            ? mouseOverFilterSeasons
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
        }
      >
        Seasons
      </button>
      <div className={!displayFilterListSeasons ? "collapsible-content" : ""}>
        {seasons.map((season) => {
          return (
            <Season
              season={season}
              key={`season:${season.id}`}
              handleChangeCheckedSeasons={() =>
                handleChangeCheckedSeasons(season.id)
              }
              isChecked={checkedStateSeasons[season.id]}
            ></Season>
          );
        })}
      </div>
    </div>
  );
}
