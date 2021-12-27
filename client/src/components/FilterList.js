import React, { useState } from "react";
import Categories from "./Categories.js";
import Colors from "./Colors.js";
import Seasons from "./Seasons.js";
import "./FilterList.css";
// import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";

export default function FilterList({
  displayFilterList,
  handleIconClick,
  categories,
  checkedStateCategories,
  handleChangeCheckedCategories,
  colors,
  checkedStateColors,
  handleChangeCheckedColors,
  seasons,
  checkedStateSeasons,
  handleChangeCheckedSeasons,
  handleClickResetForm,
}) {

  const [mouseOverFormResetButton, setMouseOverFormResetButton] =
    useState(false);
  const [mouseOverFormDoneButton, setMouseOverFormDoneButton] = useState(false);

  {
    displayFilterList ? (
      <img
        src={CloseSortIcon}
        alt="close sort icon"
        onClick={handleIconClick}
        className="icon-sorted-list"
      />
    ) : (
      <i class="fas fa-list icon-sorted-list" onClick={handleIconClick}></i>
    )
  }

  return (
    <div >
      {displayFilterList ? (
        <img
          src={CloseSortIcon}
          alt="close sort icon"
          onClick={handleIconClick}
          className="icon-sorted-list"
        />
      ) : (
        <i class="fas fa-list icon-sorted-list" onClick={handleIconClick}></i>
      )}
      <form
        onReset={handleClickResetForm}
        className={!displayFilterList ? "hidden-content-list" : ""}
      >
        <div id="collapsible-button-container">
          <Categories
            categories={categories}
            handleChangeCheckedCategories={(categoryId) =>
              handleChangeCheckedCategories(categoryId)
            }
            checkedStateCategories={checkedStateCategories}
          ></Categories>
          <Colors
            colors={colors}
            handleChangeCheckedColors={(colorId) =>
              handleChangeCheckedColors(colorId)
            }
            checkedStateColors={checkedStateColors}
          ></Colors>
          <Seasons
            seasons={seasons}
            handleChangeCheckedSeasons={(seasonId) =>
              handleChangeCheckedSeasons(seasonId)
            }
            checkedStateSeasons={checkedStateSeasons}
          ></Seasons>
        </div>
        <div id="filter-list-button-container">
          <button
            type="reset"
            id="reset-button"
            onMouseEnter={() => setMouseOverFormResetButton(true)}
            onMouseLeave={() => setMouseOverFormResetButton(false)}
            className={
              mouseOverFormResetButton
                ? "active-reset-button filter-list-button"
                : "filter-list-button"
            }
          >
            CLEAR ALL
          </button>
          <button
            type="button"
            onMouseEnter={() => setMouseOverFormDoneButton(true)}
            onMouseLeave={() => setMouseOverFormDoneButton(false)}
            onClick={handleIconClick}
            id="done-button"
            className={
              mouseOverFormDoneButton
                ? "active-done-button filter-list-button"
                : "filter-list-button"
            }
          >
            DONE
          </button>
        </div>
      </form>
    </div>
  );
}
