import React from "react";
import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";
import Categories from "./Categories.js";
import Colors from "./Colors.js";
import Seasons from "./Seasons.js";

export default function FilterList({
  handleIconClick,
  displayFilterList,
  categories,
  handleChangeCheckedCategories,
  colors,
  handleChangeCheckedColors,
  seasons,
  handleChangeCheckedSeasons,
  // checkedStateCategories,
  // checked,
}) {
  return (
    <div>
      <div>
        {displayFilterList ? (
          <img
            src={CloseSortIcon}
            alt="close sort icon"
            onClick={handleIconClick}
          />
        ) : (
          <img src={SortIcon} alt="sort icon" onClick={handleIconClick} />
        )}
      </div>
      <Categories
        displayFilterList={displayFilterList}
        categories={categories}
        handleChangeCheckedCategories={(categoryId) =>
          handleChangeCheckedCategories(categoryId)
        }
        // checkedStateCategories={checkedStateCategories}
        // checkedStateCategory={(categoryId) =>
        //   !!checkedStateCategories[categoryId]
        // }
      ></Categories>
      <Colors
        displayFilterList={displayFilterList}
        colors={colors}
        handleChangeCheckedColors={(colorId) =>
          handleChangeCheckedColors(colorId)
        }
      ></Colors>
      <Seasons
        displayFilterList={displayFilterList}
        seasons={seasons}
        handleChangeCheckedSeasons={(seasonId) =>
          handleChangeCheckedSeasons(seasonId)
        }
      ></Seasons>
    </div>
  );
}
