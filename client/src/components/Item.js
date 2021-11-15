import React from "react";
import "./Item.css";

export default function Item({ item, onClick }) {
  //   const logo = require();
  return (
    <div className="clothElement">
      <img src={item.image} alt="item" className="item-image" />
      <button id="delete-item-button" onClick={() => onClick(item.id)}>
        Delete
      </button>
      <div>{item.color}</div>​
    </div>
  );
}
