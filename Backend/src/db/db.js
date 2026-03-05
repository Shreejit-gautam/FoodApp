const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI;
async function connectdb() {
  await mongoose.connect(MONGO_URI)
  console.log('MongoDB connected')
}

module.exports = connectdb