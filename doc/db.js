const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://mongo-svc:32000/';
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('Test');
  }
  return db;
};

module.exports = connectDB;
