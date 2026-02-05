const Cart = require("../models/cart.model.js");
const Product = require("../models/product.model.js");

/* ================= HELPERS ================= */

const recalcTotals = (cart) => {
  let totalItems = 0;
  let totalPrice = 0;
  let totalMrp = 0;

  cart.items.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.subtotal;
    totalMrp += item.mrp * item.qty;
  });

  cart.totalItems = totalItems;
  cart.totalPrice = totalPrice;
  cart.totalMrp = totalMrp;
};

/* ================= GET CART ================= */

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId });
  }

  res.json(cart);
};

/* ================= ADD TO CART ================= */

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, color, size, qty } = req.body;

  if (!productId || !color || !size || !qty) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product not available" });
  }

  const variant = product.variants.find(
    v => v.colorName === color.toLowerCase()
  );
  if (!variant) {
    return res.status(400).json({ message: "Invalid color variant" });
  }

  const sizeObj = variant.sizes.find(s => s.size === size.toUpperCase());
  if (!sizeObj || sizeObj.stock < qty) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const image = variant.images[0];

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existing = cart.items.find(
    i =>
      i.productId.equals(productId) &&
      i.color === color.toLowerCase() &&
      i.size === size.toUpperCase()
  );

  if (existing) {
    if (existing.qty + qty > existing.maxStock) {
      return res.status(400).json({ message: "Stock limit exceeded" });
    }

    existing.qty += qty;
    existing.subtotal = existing.qty * existing.price;
  } else {
    cart.items.push({
      productId,
      slug: product.slug,
      title: product.title,
      brand: product.brand,
      image,
      price: product.price,
      mrp: product.mrp,
      qty,
      maxStock: sizeObj.stock,
      color: color.toLowerCase(),
      colorHex: variant.colorHex,
      size: size.toUpperCase(),
      subtotal: product.price * qty
    });
  }

  recalcTotals(cart);
  await cart.save();

  res.status(201).json(cart);
};

/* ================= UPDATE QTY ================= */

exports.updateQty = async (req, res) => {
  const userId = req.user.id;
  const { itemId, qty } = req.body;

  if (!itemId || !qty || qty < 1) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  if (qty > item.maxStock) {
    return res.status(400).json({ message: "Stock limit exceeded" });
  }

  item.qty = qty;
  item.subtotal = item.price * qty;

  recalcTotals(cart);
  await cart.save();

  res.json(cart);
};

/* ================= REMOVE ITEM ================= */

exports.removeItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i._id.toString() !== itemId);

  recalcTotals(cart);
  await cart.save();

  res.json(cart);
};

/* ================= CLEAR CART ================= */

exports.clearCart = async (req, res) => {
  const userId = req.user.id;

  await Cart.findOneAndUpdate(
    { userId },
    {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalMrp: 0
    }
  );

  res.json({ message: "Cart cleared" });
};
