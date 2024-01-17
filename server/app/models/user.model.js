const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  active: Boolean
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = async function () {
  return await jwt.sign({ userId: this.id }, config.secret, { 
    algorithm: 'HS256', 
    allowInsecureKeySizes: true, 
    expiresIn: 86400,
  });
};

const User = mongoose.model(
  "User",
  UserSchema
);

module.exports = User;
