const express = require("express");
const router = express.Router();

const MainCategory = require("../../models/MainCategory");
const Brand = require("../../models/Brand");
const ProdCategory = require("../../models/ProdCategory");
const SubCategory = require("../../models/SubCategory");

router.get("/maincategories", async (req, res) => {
  try {
    const data = await MainCategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .select("name slug");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load main categories" });
  }
});


router.get("/brands", async (req, res) => {
  try {
    const { mainCategory } = req.query;

    if (!mainCategory || mainCategory === "all") {
      return res.json([]);
    }

    const data = await Brand.find({
      mainCategories: mainCategory,
      isActive: true,
    })
      .sort({ sortOrder: 1 })
      .select("name slug");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load brands" });
  }
});


router.get("/prodcategories", async (req, res) => {
  try {
    const { mainCategory, brand } = req.query;

    if (!mainCategory || mainCategory === "all" || !brand) {
      return res.json([]);
    }

    const data = await ProdCategory.find({
      mainCategory,
      brands: brand,
      isActive: true,
    })
      .sort({ sortOrder: 1 })
      .select("name slug image");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load categories" });
  }
});

router.get("/subcategories", async (req, res) => {
  try {
    const { mainCategory, brand, prodCategory } = req.query;

    if (
      !mainCategory ||
      mainCategory === "all" ||
      !brand ||
      !prodCategory
    ) {
      return res.json([]);
    }

    const data = await SubCategory.find({
      mainCategory,
      prodCategory,
      brands: brand,
      isActive: true,
    })
      .sort({ sortOrder: 1 })
      .select("name slug image");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load sub categories" });
  }
});

module.exports = router;
