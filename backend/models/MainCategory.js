const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
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

mainCategorySchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model("MainCategory", mainCategorySchema);
