import Category from "./Category.js";
import "./Categories.css";

export default function Categories({
  categories,
  onChange,
  checked,
  displayFilterList,
}) {
  return (
    <div>
      <h6 className={!displayFilterList ? "hidden-content-list" : ""}>
        Categories:{" "}
      </h6>
      {categories.map((category) => {
        return (
          <Category
            checked={() => checked(category.id)}
            category={category}
            key={category.id}
            onChange={() => onChange(category.id)}
            displayFilterList={displayFilterList}
          ></Category>
        );
      })}
    </div>
  );
}
