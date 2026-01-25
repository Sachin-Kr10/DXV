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
    const query = {
      isActive: true,
    }; 

    if (mainCategory && mainCategory !== "all") {
      query.mainCategories = mainCategory;
    }

    const data = await Brand.find(query)
      .sort({ sortOrder: 1 })
      .select("name slug logo");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load brands" });
  }
});


router.get("/prodcategories", async (req, res) => {
  try {
    const { mainCategory, brand } = req.query;
    
    const query = { isActive: true };

    if (mainCategory && mainCategory !== "all") {
      query.mainCategory = mainCategory;
    }
    if (brand) {
      query.brands = brand;
    }

    const data = await ProdCategory.find(query)
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

    const query = { isActive: true };
    if (mainCategory && mainCategory !== "all") {
      query.mainCategory = mainCategory;
    }
    if (brand) {
      query.brands = brand;
    }
    if (prodCategory) {
      query.prodCategory = prodCategory; 
    }

    const data = await SubCategory.find(query)
      .sort({ sortOrder: 1 })
      .select("name slug image category");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load sub categories" });
  }
});

module.exports = router;
