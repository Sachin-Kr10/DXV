const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/", async (req, res) => {
  try {
    const {
      mainCategory,
      brand,
      prodCategory,
      subCategory,
      sort,
    } = req.query;

    const query = { isActive: true };

    if (mainCategory && mainCategory !== "all") query.mainCategory = mainCategory;
    if (brand) query.brand = brand;
    if (prodCategory) query.prodCategory = prodCategory;
    if (subCategory) query.subCategory = subCategory;

    let sortQuery = { createdAt: -1 }; 

    if (sort === "popular") {
      sortQuery = { orderCount: -1 };
    }

    if (sort === "featured") {
      sortQuery = { featuredScore: -1 };
    }

    const products = await Product.find(query)
      .sort(sortQuery)
      .limit(20);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to load products" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
