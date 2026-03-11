const mongoose = require('mongoose');

// Define the schema
const foodpartnerSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true
    },
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
    phoneno: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // optional: adds createdAt and updatedAt fields
);

// Create the model
const foodpartner = mongoose.model('foodpartner', foodpartnerSchema);

module.exports = foodpartner;