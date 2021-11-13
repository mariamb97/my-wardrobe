import React from "react";
import "./Item.css";

export default function Item({ item, onClick }) {
  //   const logo = require();
  return (
    <div>
      <img src={item.image} alt="item" className="item-image" />
      <button onClick={() => onClick(item.id)}>Delete</button>
      <div>{item.color}</div>​
    </div>
  );
}
