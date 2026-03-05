const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema(
  {
    username: {
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
  },
  {
    timestamps: true // adds createdAt and updatedAt fields automatically
  }
);

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
