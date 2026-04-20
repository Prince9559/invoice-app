import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await API.get("/invoice");
    setInvoices(res.data);
  };

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.total, 0);

  return (
    <div className="dashboard">

      <div className="dash-header">
        <h2>📊 Dashboard</h2>
        <p>Manage your invoices easily</p>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Invoices</h3>
          <p>{invoices.length}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customerName}</td>
                <td>{new Date(inv.date).toLocaleDateString()}</td>
                <td className="amount">₹{inv.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;