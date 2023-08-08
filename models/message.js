//message.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      min: 1,
      max: 500,
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    timestamp: {
      type: String,
      required: true,
    },
    received: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
