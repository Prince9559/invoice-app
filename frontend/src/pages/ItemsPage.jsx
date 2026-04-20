import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ItemForm from "../components/Item/ItemForm";
import ItemList from "../components/Item/ItemList";
import "./ItemsPage.css";

function ItemsPage() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="page-container">
      {/* 🔥 Navbar */}
      <div className="topbar">
        <h2>Invoice App</h2>

        <div className="nav-links">
          <Link to="/invoice">Create Invoice</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>

      {/* 🔥 Add Item */}
      <div className="form-section">
        <ItemForm fetchItems={fetchItems} />
      </div>

      {/* 🔥 Items List */}
      <div className="items-section">
        <center><h2>Items</h2></center>

        <div className="items-grid">
          <ItemList items={items} />
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
