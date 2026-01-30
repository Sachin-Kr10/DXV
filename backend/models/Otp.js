const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['signup', 'login', 'reset-password'],
    required: true
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 
  }
});

otpSchema.index({ email: 1, type: 1, createdAt: -1 });
otpSchema.index({ phone: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('Otp', otpSchema);