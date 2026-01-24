const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/", async (req, res) => {
  try {
    let { mainCategory, brand, prodCategory, subCategory } = req.query;

    const query = { isActive: true };

    if (mainCategory && mainCategory !== "all") {
      query.mainCategory = mainCategory;
    }

    if (brand) query.brand = brand;
    if (prodCategory) query.prodCategory = prodCategory;
    if (subCategory) query.subCategory = subCategory;

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to load products" });
  }
});

module.exports = router;
