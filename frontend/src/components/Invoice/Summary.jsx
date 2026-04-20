import React from "react";
import { calculateRowTotal } from "../../utils/calculations";
import "./Summary.css";

function Summary({ selectedItems }) {
  let total = 0;

  selectedItems.forEach((row) => {
    total += calculateRowTotal(
      row.price || 0,
      Number(row.qty),
      Number(row.gst),
      Number(row.discount),
      row.type
    );
  });

  return (
    <div className="summary">
      <h2>Grand Total: ₹{total.toFixed(2)}</h2>
    </div>
  );
}

export default Summary;