import React, { useState } from "react";
import SortIcon from "./../images/sort_icon.png";
import CloseSortIcon from "./../images/close_sort_icon.png";
import Categories from "./Categories.js";
import Colors from "./Colors.js";
import Seasons from "./Seasons.js";
import "./FilterList.css";

export default function FilterList({
  categories,
  handleChangeCheckedCategories,
  colors,
  handleChangeCheckedColors,
  seasons,
  handleChangeCheckedSeasons,
  handleClickResetForm,
}) {
  const [displayFilterList, setDisplayFilterList] = useState(false);
  const [mouseOverFormResetButton, setMouseOverFormResetButton] =
    useState(false);
  const [mouseOverFormDoneButton, setMouseOverFormDoneButton] = useState(false);

  const handleIconClick = () => {
    setDisplayFilterList(!displayFilterList);
  };

  return (
    <div>
      <div>
        {displayFilterList ? (
          <img
            src={CloseSortIcon}
            alt="close sort icon"
            onClick={handleIconClick}
            className="icon-sorted-list"
          />
        ) : (
          <img
            src={SortIcon}
            alt="sort icon"
            onClick={handleIconClick}
            className="icon-sorted-list"
          />
        )}
      </div>
      <form
        onReset={handleClickResetForm}
        className={!displayFilterList ? "hidden-content-list" : ""}
      >
        <Categories
          displayFilterList={displayFilterList}
          categories={categories}
          handleChangeCheckedCategories={(categoryId) =>
            handleChangeCheckedCategories(categoryId)
          }
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
        <div id="filter-list-button-container">
          <button
            type="reset"
            id="reset-button"
            onMouseEnter={() => setMouseOverFormResetButton(true)}
            onMouseLeave={() => setMouseOverFormResetButton(false)}
            onReset={handleClickResetForm}
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
