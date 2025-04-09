const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('ordersDB');
}

async function getOrders() {
  const db = await connectDB();
  return db.collection('orders').find({}).toArray();
}

async function createOrder(order) {
  const db = await connectDB();
  const result = await db.collection('orders').insertOne(order);
  return result.ops[0];
}

module.exports = { getOrders, createOrder };