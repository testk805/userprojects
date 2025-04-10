const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  items: [{
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);