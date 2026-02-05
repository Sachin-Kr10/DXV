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
      validate: {
        validator(v) {
          return v <= this.maxStock;
        },
        message: "Quantity exceeds available stock"
      }
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
      uppercase: true,
    },

    size: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }
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

    totalItems: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      default: 0
    },

    totalMrp: {
      type: Number,
      default: 0
    }
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
