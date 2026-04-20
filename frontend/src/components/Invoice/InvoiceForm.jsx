import React, { useEffect, useState } from "react";
import API from "../../services/api";
import InvoiceTable from "./InvoiceTable";
import Summary from "./Summary";
import { generatePDF } from "../../utils/pdfGenerator";
import { calculateRowTotal } from "../../utils/calculations";
import "./InvoiceForm.css";

function InvoiceForm() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, row) => {
      return (acc +calculateRowTotal(
          Number(row.price || 0),
          Number(row.qty || 1),
          Number(row.gst || 0),
          Number(row.discount || 0),
          row.type
        )
      );
    }, 0);
  };

  const handleSave = async () => {
    const data = {
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      items: selectedItems,
      total: calculateTotal(),
      invoiceNumber: "INV-" + Date.now(),
      date: new Date(),
    };

    try 
    {
      await API.post("/invoice", data);
      alert("Invoice Saved Successfully!");
    } 
    catch (error) 
    {
      console.log(error);
      alert("Error saving invoice");
    }
  };

  const handlePDF = () => 
    {
    generatePDF({
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      items: selectedItems,
      total: calculateTotal(),
    });
  };

  return (
    <div className="invoice-container">
      <h2 className="title">Create Invoice</h2>

      <div className="card customer-card">
        <h3>Customer Details</h3>

        <div className="grid">
          <input placeholder="Full Name" value={customer.name}onChange={(e) => setCustomer({ ...customer, name: e.target.value })}/>
          <input placeholder="Phone" value={customer.phone}onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}/>
          <input placeholder="Email" value={customer.email}onChange={(e) => setCustomer({ ...customer, email: e.target.value })}/>
          <input placeholder="Address" value={customer.address}onChange={(e) => setCustomer({ ...customer, address: e.target.value })}/>
        </div>
      </div>

      <div className="card">
      <InvoiceTable items={items} selectedItems={selectedItems}setSelectedItems={setSelectedItems}/>
      </div>

      <div className="card">
      <Summary selectedItems={selectedItems} />
      </div>

      <div className="actions">
      <button className="save" onClick={handleSave}>Save Invoice</button>
      <button className="pdf" onClick={handlePDF}>Download PDF</button>
      </div>

    </div>
  );
}

export default InvoiceForm;