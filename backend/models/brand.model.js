const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
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

    logo:{
      type:String,
      required : true,
    },

    mainCategories: {
      type: [String], 
      required: true,
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

brandSchema.index({ isActive: 1, sortOrder: 1 });
brandSchema.index({ mainCategories: 1, isActive: 1 });

module.exports = mongoose.model("Brand", brandSchema);
