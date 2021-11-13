import React from "react";
import Color from "./Color.js";

export default function Colors({
  displayFilterList,
  colors,
  handleChangeCheckedColors,
}) {
  return (
    <div>
      <h6 className={!displayFilterList ? "hidden-content-list" : ""}>
        Colors:{" "}
      </h6>
      {colors.map((color) => {
        return (
          <Color
            color={color}
            key={color.id}
            handleChangeCheckedColors={() =>
              handleChangeCheckedColors(color.id)
            }
            displayFilterList={displayFilterList}
          ></Color>
        );
      })}
    </div>
  );
}
