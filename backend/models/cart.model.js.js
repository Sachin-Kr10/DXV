const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
    },

    maxStock: {
      type: Number,
      required: true,
      min: 0,
    },

    color: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    colorHex: {
      type: String,
      required: true,
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

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

cartSchema.index({
  userId: 1,
  "items.productId": 1,
  "items.color": 1,
  "items.size": 1,
});


module.exports = mongoose.model("Cart", cartSchema);
