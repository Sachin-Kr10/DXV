const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim : true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      lowercase : true,
      trim:true,
    },

    colorHex: {
      type: String,
      required: true,
      uppercase:true,
    },

    images: {
      type: [String],
      required: true,
    },

    sizes: {
      type: [sizeSchema],
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    mainCategory: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },

    prodCategory: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },

    subCategory: {
      type: String,
      default: null,
      index: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
      index: true,
    },

    mrp: {
      type: Number,
      required: true,
    },

    orderCount: {
      type: Number,
      default: 0,
      index: true,
    },

    featuredScore: {
      type: Number,
      default: 0,
      index: true,
    },

    description: {
      type: String,
    },

    variants: {
      type: [variantSchema],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

productSchema.index({
  mainCategory: 1,
  brand: 1,
  prodCategory: 1,
  subCategory: 1,
  isActive: 1,
  price: 1
});


module.exports = mongoose.model("Product", productSchema);
