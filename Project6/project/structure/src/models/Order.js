const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  orderDate: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);