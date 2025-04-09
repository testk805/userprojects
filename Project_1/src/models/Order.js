const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  orderDate: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Order', orderSchema);