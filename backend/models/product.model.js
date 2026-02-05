const mongoose = require("mongoose");
const slugify = require("slugify");

const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    colorHex: {
      type: String,
      required: true,
      uppercase: true
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: v => v.length >= 1 && v.length <= 6,
        message: "Each color must have 1–6 images"
      }
    },

    sizes: {
      type: [sizeSchema],
      required: true,
      validate: {
        validator: v => v.length > 0,
        message: "At least one size required"
      }
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
    },

    mainCategory: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    prodCategory: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    subCategory: {
      type: String,
      default: null,
      lowercase: true,
      index: true
    },

    brand: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true
    },

    mrp: {
      type: Number,
      required: true,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    color: {
      type: [String],
      lowercase: true,
      index: true
    },

    design: {
      type: String,
      lowercase: true,
      default: "solid"
    },

    fit: {
      type: String,
      lowercase: true,
      default: "regular"
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    ratingCount: {
      type: Number,
      default: 0
    },

    orderCount: {
      type: Number,
      default: 0,
      index: true
    },

    featuredScore: {
      type: Number,
      default: 0,
      index: true
    },

    description: {
      type: String
    },

    variants: {
      type: [variantSchema],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

productSchema.index({
  mainCategory: 1,
  prodCategory: 1,
  subCategory: 1,
  brand: 1,
  color: 1,
  price: 1,
  isActive: 1
});


productSchema.pre("validate", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true
    });
  }
});

productSchema.pre("save", function () {
  if (this.mrp > 0 && this.price > 0) {
    this.discount = Math.round(
      ((this.mrp - this.price) / this.mrp) * 100
    );
  }

  this.color = this.variants.map(v => v.colorName);
});


module.exports = mongoose.model("Product", productSchema);
