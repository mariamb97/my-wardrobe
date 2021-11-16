import React, { useState } from "react";
import Color from "./Color.js";

export default function Colors({
  colors,
  handleChangeCheckedColors,
  checkedStateColors,
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
          !displayFilterListColors
            ? mouseOverFilterColors
              ? "collapsible-button active-collapsible-button"
              : "collapsible-button"
            : "collapsible-button active-collapsible-button"
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
              isChecked={checkedStateColors[color.id]}
            ></Color>
          );
        })}
      </div>
    </div>
  );
}
