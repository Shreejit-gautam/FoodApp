const mongoose = require('mongoose');

// Define the schema
const foodpartnerSchema = new mongoose.Schema(
  {
    foodpartnername: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

// Create the model
const foodpartner = mongoose.model('foodpartner', foodpartnerSchema);

module.exports = foodpartner;
