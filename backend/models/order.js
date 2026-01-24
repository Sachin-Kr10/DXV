const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index:true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      lowercase:true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min:0,
    },

    qty: {
      type: Number,
      required: true,
      min:true,
    },    
    
    color: {
      type: String,
      trim: true,
      lowercase: true,
    },

    size: {
      type: String,
      trim: true,
      uppercase: true,
    },

  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true,trim: true },

    country: { type: String, required: true, trim: true },
    address1: { type: String, required: true, trim: true },
    address2: { type: String , trim: true},

    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      immutable:true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      immutable:true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate:[(v)=>v.length > 0 ,"Must have one item"]
    },

    address: {
      type: addressSchema,
      required: true,
      immutable:true,
    },
    
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min:0,
      index:true,
    },

    paymentMethod: {
      type: String,
      required: true,
      index:true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    paymentId: {
      type: String,
      index: true,
    },

    paymentGateway: {
      type: String, //razorpay
    },

    paidAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "placed",
      index: true,
    },

    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
    returnedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
