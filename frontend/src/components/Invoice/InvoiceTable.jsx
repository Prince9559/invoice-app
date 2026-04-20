import React from "react";
import { calculateRowTotal } from "../../utils/calculations";
import "./InvoiceTable.css";

function InvoiceTable({ items, selectedItems, setSelectedItems }) {

  const addRow = () => {
    setSelectedItems([...selectedItems,{ itemId: "", qty: 1, gst: 5, discount: 0, type: "%" },]);
  };

  const removeRow = (index) => {
    const updated = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...selectedItems];
    updated[index][field] = value;
    setSelectedItems(updated);
  };

  return (
    <div className="invoice-table">
      <div className="table-header">
        <h3>Invoice Items</h3>
        <button className="add-btn" onClick={addRow}>+ Add Item</button>
      </div>

      <div className="table">
        <div className="table-row header">
          <span>Item</span>
          <span>Qty</span>
          <span>GST</span>
          <span>Discount</span>
          <span>Total</span>
          <span>Action</span>
        </div>

        {selectedItems.map((row, i) => {
          const selectedItem = items.find((it) => it._id === row.itemId);
          const price = selectedItem ? selectedItem.price : 0;

          row.price = price;
          const total = calculateRowTotal(price,Number(row.qty),Number(row.gst),Number(row.discount),row.type);

          return (
            <div key={i} className="table-row">

              <select value={row.itemId} onChange={(e) => handleChange(i, "itemId", e.target.value)}>
                <option value="">Select</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                  {item.name}
                  </option>
                ))}
              </select>

              <input type="number"value={row.qty}onChange={(e) => handleChange(i, "qty", e.target.value)}/>

              <select value={row.gst} onChange={(e) => handleChange(i, "gst", e.target.value)}>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
              </select>

              <div className="discount-box">
                <input type="number"value={row.discount} onChange={(e) => handleChange(i, "discount", e.target.value)}/>
                <select value={row.type} onChange={(e) => handleChange(i, "type", e.target.value)}>
                  <option value="%">%</option>
                  <option value="₹">₹</option>
                </select>
              </div>

              <p className="total">₹{total.toFixed(2)}</p>
              <button className="delete-btn" onClick={() => removeRow(i)}>✕ </button>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default InvoiceTable;