//users.js

const users = require("../models/User");

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

const getUserByUsername = async (req, res, next) => {
  let user;
  try {
    user = await users.findOne({ username: req.params.username });
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

const getUserByEmail = async (req, res, next) => {
  let user;
  try {
    user = await users.findOne({ email: req.params.email });
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

module.exports = { getUser, getUserByUsername, getUserByEmail };
