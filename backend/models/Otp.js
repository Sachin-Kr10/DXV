const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  
  otp: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ["signup", "login", "reset-password"],
    required: true
  },

  data: {
    name: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300
  }
});

otpSchema.index({ email: 1, type: 1, createdAt: -1 });
otpSchema.index({ phone: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model("Otp", otpSchema);
