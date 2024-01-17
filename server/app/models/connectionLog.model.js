const mongoose = require("mongoose");

const ConnectionLog = mongoose.model(
  "ConnectionLog",
  new mongoose.Schema({
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    logIn: { type: Boolean, required: true },
  })
);

module.exports = ConnectionLog;
