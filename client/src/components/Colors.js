import React, { useState } from "react";
import Color from "./Color.js";

export default function Colors({
  displayFilterList,
  colors,
  handleChangeCheckedColors,
}) {
  const [displayFilterListColors, setDisplayFilterListColors] = useState(false);
  const [mouseOverFilterColors, setMouseOverFilterColors] = useState(false);

  const handleClickDisplayFilterColors = () => {
    setDisplayFilterListColors(!displayFilterListColors);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickDisplayFilterColors}
        onMouseEnter={() => setMouseOverFilterColors(true)}
        onMouseLeave={() => setMouseOverFilterColors(false)}
        className={
          displayFilterList
            ? !displayFilterListColors
              ? mouseOverFilterColors
                ? "collapsible-button active-collapsible-button"
                : "collapsible-button"
              : "collapsible-button active-collapsible-button"
            : "hidden-content-list"
        }
      >
        Colors
      </button>
      <div className={!displayFilterListColors ? "collapsible-content" : ""}>
        {colors.map((color) => {
          return (
            <Color
              color={color}
              key={`color:${color.id}`}
              handleChangeCheckedColors={() =>
                handleChangeCheckedColors(color.id)
              }
              displayFilterList={displayFilterList}
            ></Color>
          );
        })}
      </div>
    </div>
  );
}
