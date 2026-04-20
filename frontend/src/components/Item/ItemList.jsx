import React from "react";
import "./ItemList.css";

function ItemList({ items }) {
  return (
    <>
      {items.map((item) => (
        <div key={item._id} className="item-card">

          <div className="card-top">
            <h3>{item.name}</h3>
            <span className="price">₹{item.price}</span>
          </div>

          <p className="desc">{item.description}</p>

          <div className="variant">{item.variant}</div>

        </div>
      ))}
    </>
  );
}

export default ItemList;