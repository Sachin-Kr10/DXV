const wishlistItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
  },
  { _id: false }
);

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    items: {
      type: [wishlistItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

wishlistSchema.index({ userId: 1, "items.productId": 1 });

module.exports = mongoose.model("Wishlist", wishlistSchema);
