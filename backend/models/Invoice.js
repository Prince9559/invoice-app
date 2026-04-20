const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  email: String,
  address: String,
  items: Array,
  total: Number,
  invoiceNumber: String,
  date: Date,
});

module.exports = mongoose.model("Invoice", invoiceSchema);