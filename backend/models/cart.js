const mongoose = require("mongoose");

/* ---------- Cart Item ---------- */
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
    },

    color: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
  },
  { _id: false }
);

/* ---------- Cart Schema ---------- */
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1 });

module.exports = mongoose.model("Cart", cartSchema);
