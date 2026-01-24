const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },

    country: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },

    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false, 
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
