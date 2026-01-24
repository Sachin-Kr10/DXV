const express = require("express");
const router = express.Router();

const MainCategory = require("../../models/MainCategory");
const Category = require("../../models/ProdCategory");
const SubCategory = require("../../models/SubCategory");

router.get("/", async (req, res) => {
  try {
    const { mainCategory, category, brand } = req.query;

    const mainCategories = await MainCategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .select("name slug");

    let categories = [];

    if (mainCategory) {
      categories = await Category.find({
        mainCategory,
        isActive: true,
        ...(brand && { brands: brand }),
      })
        .sort({ sortOrder: 1 })
        .select("name slug image");
    }

    let subCategories = [];
    if (mainCategory && category) {
      subCategories = await SubCategory.find({
        mainCategory,
        category,
        isActive: true,
        ...(brand && { brands: brand }),
      })
        .sort({ sortOrder: 1 })
        .select("name slug image");
    }

    res.status(200).json({
      success: true,
      data: {
        mainCategories,
        categories,
        subCategories,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category data",
    });
  }
});

module.exports = router;
