const mongoose = require("mongoose");

/* ORDER ITEM SNAPSHOT */
const orderItemSchema = new mongoose.Schema(
  {
    productId: mongoose.Schema.Types.ObjectId,

    title: String,
    brand: String,

    price: Number,
    qty: Number,

    color: String,
    size: String,
    image: String,
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    country: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    pincode: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,

    items: [orderItemSchema],

    address: [addressSchema],

    totalAmount: Number,

    paymentMethod: String,
    paymentStatus: {
      type: String,
      default: "pending",
    },

    orderStatus: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
