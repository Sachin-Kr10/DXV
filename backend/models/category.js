const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
      index: true,
    },
    parent: {
      type: String,
      default: null,
      index: true,
    },
    main: {
      type: String,
      default: null,
      index: true,
    },

    image: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);
categorySchema.index(
  { slug: 1, parent: 1 },
  { unique: true }
);

module.exports = mongoose.model("Category", categorySchema);
