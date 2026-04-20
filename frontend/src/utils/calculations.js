export const calculateRowTotal = (price, qty, gst, discount, type) => {
  let total = price * qty;

  // discount
  if (type === "%") {
    total -= (total * discount) / 100;
  } else {
    total -= discount;
  }

  // gst
  const gstAmount = (total * gst) / 100;

  return total + gstAmount;
};