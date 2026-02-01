const MainCategory = require("../models/MainCategory");
const ProdCategory = require("../models/ProdCategory");
const SubCategory = require("../models/SubCategory");
const uploadToCloudinary = require("../utils/cloudinary");
const slugify = require("slugify");


/* ================= MAIN CATEGORY ================= */

exports.getMain = async (req, res, next) => {
  try {

    const data = await MainCategory
      .find()
      .sort({ sortOrder: 1 })
      .lean();

    res.json(data);

  } catch (err) {
    next(err);
  }
};


exports.createMain = async (req, res, next) => {
  try {

    const { name, sortOrder = 0 } = req.body;

    if (!name)
      return res.status(400).json({ message: "Name required" });

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await MainCategory.exists({ slug });

    if (exists)
      return res.status(409).json({ message: "Already exists" });

    const category = await MainCategory.create({
      name: name.trim(),
      slug,
      sortOrder: Number(sortOrder)
    });

    res.status(201).json(category);

  } catch (err) {
    next(err);
  }
};


exports.updateMain = async (req, res, next) => {
  try {

    const { name, sortOrder } = req.body;

    const updates = {};

    if (name) {
      updates.name = name.trim();
      updates.slug = slugify(name, {
        lower: true,
        strict: true
      });
    }

    if (sortOrder !== undefined)
      updates.sortOrder = Number(sortOrder);

    const updated = await MainCategory.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json(updated);

  } catch (err) {
    next(err);
  }
};


exports.deleteMain = async (req, res, next) => {
  try {

    const deleted = await MainCategory.findByIdAndDelete(
      req.params.id
    );

    if (!deleted)
      return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });

  } catch (err) {
    next(err);
  }
};



/* ================= PRODUCT CATEGORY ================= */

exports.getProd = async (req, res, next) => {
  try {

    const data = await ProdCategory
      .find()
      .sort({ sortOrder: 1 })
      .lean();

    res.json(data);

  } catch (err) {
    next(err);
  }
};


exports.createProd = async (req, res, next) => {
  try {

    const { name, mainCategory, brands, sortOrder = 0 } = req.body;

    if (!name || !mainCategory || !brands)
      return res.status(400).json({ message: "Missing fields" });

    if (!req.file)
      return res.status(400).json({ message: "Image required" });

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await ProdCategory.exists({ slug });

    if (exists)
      return res.status(409).json({ message: "Already exists" });

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      "categories"
    );

    const category = await ProdCategory.create({
      name: name.trim(),
      slug,
      mainCategory: mainCategory.toLowerCase(),
      brands: Array.isArray(brands) ? brands : [brands],
      image: uploaded.url,
      sortOrder: Number(sortOrder)
    });

    res.status(201).json(category);

  } catch (err) {
    next(err);
  }
};


exports.updateProd = async (req, res, next) => {
  try {

    const { name, mainCategory, brands, sortOrder } = req.body;

    const updates = {};

    if (name) {
      updates.name = name.trim();
      updates.slug = slugify(name, {
        lower: true,
        strict: true
      });
    }

    if (mainCategory)
      updates.mainCategory = mainCategory.toLowerCase();

    if (brands)
      updates.brands = Array.isArray(brands)
        ? brands
        : [brands];

    if (sortOrder !== undefined)
      updates.sortOrder = Number(sortOrder);

    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "categories"
      );

      updates.image = uploaded.url;
    }

    const updated = await ProdCategory.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json(updated);

  } catch (err) {
    next(err);
  }
};


exports.toggleProd = async (req, res, next) => {
  try {

    const updated = await ProdCategory.findByIdAndUpdate(
      req.params.id,
      { $bit: { isActive: { xor: 1 } } },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json({ isActive: updated.isActive });

  } catch (err) {
    next(err);
  }
};



/* ================= SUB CATEGORY ================= */

exports.getSub = async (req, res, next) => {
  try {

    const data = await SubCategory
      .find()
      .sort({ sortOrder: 1 })
      .lean();

    res.json(data);

  } catch (err) {
    next(err);
  }
};


exports.createSub = async (req, res, next) => {
  try {

    const {
      name,
      mainCategory,
      prodCategory,
      brands,
      sortOrder = 0
    } = req.body;

    if (!name || !mainCategory || !prodCategory || !brands)
      return res.status(400).json({ message: "Missing fields" });

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await SubCategory.exists({ slug });

    if (exists)
      return res.status(409).json({ message: "Already exists" });

    const sub = await SubCategory.create({
      name: name.trim(),
      slug,
      mainCategory: mainCategory.toLowerCase(),
      prodCategory: prodCategory.toLowerCase(),
      brands: Array.isArray(brands) ? brands : [brands],
      sortOrder: Number(sortOrder)
    });

    res.status(201).json(sub);

  } catch (err) {
    next(err);
  }
};


exports.updateSub = async (req, res, next) => {
  try {

    const { name, mainCategory, prodCategory, brands, sortOrder } = req.body;

    const updates = {};

    if (name) {
      updates.name = name.trim();
      updates.slug = slugify(name, {
        lower: true,
        strict: true
      });
    }

    if (mainCategory)
      updates.mainCategory = mainCategory.toLowerCase();

    if (prodCategory)
      updates.prodCategory = prodCategory.toLowerCase();

    if (brands)
      updates.brands = Array.isArray(brands)
        ? brands
        : [brands];

    if (sortOrder !== undefined)
      updates.sortOrder = Number(sortOrder);

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Not found" });

    res.json(updated);

  } catch (err) {
    next(err);
  }
};


exports.deleteSub = async (req, res, next) => {
  try {

    const deleted = await SubCategory.findByIdAndDelete(
      req.params.id
    );

    if (!deleted)
      return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });

  } catch (err) {
    next(err);
  }
};
