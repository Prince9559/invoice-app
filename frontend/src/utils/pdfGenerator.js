import jsPDF from "jspdf";

export const generatePDF = (invoice) => {
  const doc = new jsPDF();

  // 🔥 Title
  doc.setFontSize(18);
  doc.text("INVOICE", 90, 20);

  // 🔥 Customer Details
  doc.setFontSize(12);
  doc.text(`Name: ${invoice.customerName}`, 20, 40);
  doc.text(`Phone: ${invoice.phone}`, 20, 50);
  doc.text(`Email: ${invoice.email}`, 20, 60);
  doc.text(`Address: ${invoice.address}`, 20, 70);

  // 🔥 Table Header
  let y = 90;

  doc.setFontSize(13);
  doc.text("Item", 20, y);
  doc.text("Qty", 80, y);
  doc.text("Price", 110, y);
  doc.text("Total", 150, y);

  // 🔥 Line under header
  doc.line(20, y + 2, 190, y + 2);

  y += 10;

  // 🔥 Items Loop
  invoice.items.forEach((item) => {
    doc.setFontSize(11);

    doc.text(item.name || "Item", 20, y);
    doc.text(String(item.qty), 80, y);
    doc.text(`₹${item.price}`, 110, y);

    const rowTotal = item.price * item.qty;
    doc.text(`₹${rowTotal}`, 150, y);

    y += 10;
  });

  // 🔥 Divider
  y += 5;
  doc.line(20, y, 190, y);

  // 🔥 Total
  y += 10;
  doc.setFontSize(13);
  doc.text(`Grand Total: ₹${invoice.total}`, 20, y);

  // 🔥 Terms & Conditions
  y += 20;
  doc.setFontSize(12);
  doc.text("Terms & Conditions:", 20, y);

  y += 10;

  const terms = [
    "1. Payment Terms: Payment is due within 15 days of the invoice date.",
    "2. Late Fees: A late fee of 2% per month will be applied to overdue balances.",
    "3. Taxes: GST is applied as per government rules.",
    "4. Jurisdiction: All disputes are subject to Bengaluru jurisdiction only.",
    "5. Goods once sold will not be taken back or exchanged.",
    "6. Thank you for choosing HealthyChef!"
  ];

  terms.forEach((line) => {
    doc.text(line, 20, y);
    y += 8;
  });

  // 🔥 Save PDF
  doc.save("invoice.pdf");
};