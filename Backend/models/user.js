const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ["client", "user"], required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
