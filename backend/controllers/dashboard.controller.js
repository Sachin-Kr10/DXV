const MainCategory = require("../models/MainCategory");
const Category = require("../models/ProdCategory");
const SubCategory = require("../models/SubCategory");

exports.getHomeData = async (req, res, next) => {
  try {
    const { mainCategory, category, brand } = req.query;

    /* ---------- MAIN CATEGORIES ---------- */
    const mainCategories = await MainCategory.find({ isActive: true })
      .sort({ sortOrder: 1 })
      .select("name slug");

    /* ---------- CATEGORIES ---------- */
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

    /* ---------- SUB CATEGORIES ---------- */
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

    res.json({
      success: true,
      data: {
        mainCategories,
        categories,
        subCategories,
      },
    });
  } catch (err) {
    next(err);
  }
};
