const mongoose = require("mongoose");

const prodcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    mainCategory: {
      type: String, 
      required: true,
      index: true,
      lowercase: true,
    },

    brands: {
      type: [String],
      required: true,
      index: true,
    },

    image: {
      type: String, // Cloudinary URL
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

prodcategorySchema.index(
  { name: 1, mainCategory: 1 },
  { unique: true }
);

prodcategorySchema.index({ mainCategory: 1, brands: 1, isActive: 1 });

module.exports = mongoose.model("ProdCategory", prodcategorySchema);
