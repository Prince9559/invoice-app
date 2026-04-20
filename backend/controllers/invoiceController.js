const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  try 
  {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoices = async (req, res) => 
  {
  try 
  {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
};