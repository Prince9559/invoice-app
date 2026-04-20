import React, { useState } from "react";
import API from "../../services/api";
import "./ItemForm.css";

function ItemForm({ fetchItems }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    variant: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/items", form);

    setForm({
      name: "",
      description: "",
      variant: "",
      price: "",
    });

    fetchItems();
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2 className="title">Add Item</h2>

      <div className="input-group">
        <input type="text" name="name"value={form.name}onChange={handleChange}placeholder=" "required/>
        <label>Item Name</label>
      </div>

      <div className="input-group">
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder=" "/>
        <label>Description</label>
      </div>

      <div className="input-group">
        <input type="text" name="variant" value={form.variant}onChange={handleChange}placeholder=" "/>
        <label>Variant</label>
      </div>

      <div className="input-group">
        <input type="number" name="price"value={form.price}onChange={handleChange}placeholder=" "required/>
        <label>Price</label>
      </div>

      <button type="submit" className="btn">Add Item </button>
    </form>
  );
}

export default ItemForm;