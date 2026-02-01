const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    method: {
      type: String, // card | upi | cod | netbanking
      required: true,
      index: true,
    },

    gateway: {
      type: String, // razorpay | stripe | paypal
      required: true,
    },

    paymentId: {
      type: String,
      index: true,
    },

    status: {
      type: String,
      enum: ["initiated", "success", "failed", "refunded"],
      default: "initiated",
      index: true,
    },

    gatewayResponse: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
