const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number,
    image: String,
    qty: Number,
    color: String,
    size: String,
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      index: true,
    },

    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
