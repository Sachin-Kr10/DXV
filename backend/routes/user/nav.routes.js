const express = require("express");
const router = express.Router();

const MainCategory = require("../../models/maincategory.model");
const Brand = require("../../models/brand.model");
const ProdCategory = require("../../models/prodcategory.model");
const SubCategory = require("../../models/subcategory.model");

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
