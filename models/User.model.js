const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Please insert your first name."],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Please insert your last name."],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Username must be unique!"],
    unique: true,
  },
  passwordHash: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "This email already in use. 😢"],
    unique: true,
  },
});

module.exports = model("User", userSchema);
