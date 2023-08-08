// routes/messages.js

const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one message
router.get("/:id", getMessage, (req, res) => {
  res.json(res.message);
});

router.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Create one message
router.post("/", async (req, res) => {
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
});

// Update one message
router.patch("/:id", getMessage, async (req, res) => {
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
});

// Delete one message
router.delete("/:id", getMessage, async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: "Deleted message" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMessage(req, res, next) {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.message = message;
  next();
}

module.exports = router;
