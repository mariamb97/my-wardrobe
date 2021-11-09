import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  // const response = await fetch(url);
  // const json = await response.json();

  const getCategories = () => {
    fetch("/api/categories")
      .then((response) => console.log(response.json()))
      .then((categories) => setCategories(categories))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      {categories}
    </div>
  );
}

export default App;
