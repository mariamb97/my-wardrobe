import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Coats from "./components/Coats";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const response = await fetch(url);
  // const json = await response.json();

  return (
    <div className="App">
      <Routes>
        {categories.map((category) => {
          return (
            <Route
              key={category.id}
              path={`/categories/${category.id}`}
              element={<category.name />}
            />
          );
        })}
      </Routes>

      {/* {categories &&
        categories.map((category) => {
          <div>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </div>;
        })}
      <Outlet />; */}
    </div>
  );
}

export default App;
