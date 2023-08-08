//controllers/messages.js

const Message = require("../models/message");

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one message
const getOneMessage = async (req, res) => {
  res.json(res.message);
};

// Create one message
const createOneMessage = async (req, res) => {
  const message = new Message({
    message: req.body.message,
    name: req.body.name,
    timestamp: req.body.timestamp,
    received: req.body.received,
  });
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update one message
const updateOneMessage = async (req, res) => {
  if (req.body.message != null) {
    res.message.message = req.body.message;
  }
  if (req.body.name != null) {
    res.message.name = req.body.name;
  }
  if (req.body.timestamp != null) {
    res.message.timestamp = req.body.timestamp;
  }
  if (req.body.received != null) {
    res.message.received = req.body.received;
  }
  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete one message
const deleteOneMessage = async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: "Deleted message" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMessages,
  getOneMessage,
  createOneMessage,
  updateOneMessage,
  deleteOneMessage,
};
