const mongoose = require('mongoose');

// Define the schema
const foodvideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    videofile: {
      type: String,
      required: true
    },
    foodPartner:{
type: mongoose.Schema.Types.ObjectId,
ref: "foodpartner"}
  }
);

// Create the model
const foodvideo = mongoose.model('foodvideo', foodvideoSchema);

module.exports = foodvideo;
