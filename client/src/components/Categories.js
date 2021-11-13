import Category from "./Category.js";
import "./Categories.css";

export default function Categories({
  displayFilterList,
  categories,
  handleChangeCheckedCategories,
  // checkedStateCategory,
}) {
  return (
    <div>
      <h6 className={!displayFilterList ? "hidden-content-list" : ""}>
        Categories:{" "}
      </h6>
      {categories.map((category) => {
        return (
          <Category
            category={category}
            key={category.id}
            handleChangeCheckedCategories={() =>
              handleChangeCheckedCategories(category.id)
            }
            displayFilterList={displayFilterList}
            // checkedStateCategory={() => checkedStateCategory(category.id)}
          ></Category>
        );
      })}
    </div>
  );
}
