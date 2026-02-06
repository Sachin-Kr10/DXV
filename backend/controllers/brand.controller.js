const Brand = require("../models/brand.model");
const uploadToCloudinary = require("../utils/cloudinary");
const slugify = require("slugify");
const mongoose = require("mongoose");

/* ================= CREATE ================= */

exports.createBrand = async (req, res, next) => {
  try {
    const { name, mainCategories, sortOrder = 0 } = req.body;

    if (!name)
      return res.status(400).json({ message: "Name required" });

    if (!mainCategories?.length)
      return res
        .status(400)
        .json({ message: "Main categories required" });

    if (!req.file)
      return res.status(400).json({ message: "Logo required" });

    const slug = slugify(name, {
      lower: true,
      strict: true
    });

    const exists = await Brand.exists({ slug });

    if (exists)
      return res
        .status(409)
        .json({ message: "Already exists" });

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      {
        folder: "brands",
        width: 400,
        height: 400
      }
    );

    const brand = await Brand.create({
      name: name.trim(),
      slug,
      logo: uploaded.url,

      mainCategories: Array.isArray(mainCategories)
        ? mainCategories
        : [mainCategories],

      sortOrder: Number(sortOrder)
    });

    res.status(201).json(brand);
  } catch (err) {
    next(err);
  }
};

/* ================= LIST ================= */

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.json(brands);
  } catch (err) {
    next(err);
  }
};

/* ================= UPDATE ================= */

exports.updateBrand = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID" });
    }

    const { name, mainCategories, sortOrder } =
      req.body;

    const updates = {};

    /* ---------- NAME + SLUG ---------- */

    if (name) {
      const slug = slugify(name, {
        lower: true,
        strict: true
      });

      const exists = await Brand.exists({
        slug,
        _id: { $ne: id }
      });

      if (exists) {
        return res
          .status(409)
          .json({ message: "Name already exists" });
      }

      updates.name = name.trim();
      updates.slug = slug;
    }

    /* ---------- CATEGORIES ---------- */

    if (mainCategories) {
      updates.mainCategories = Array.isArray(
        mainCategories
      )
        ? mainCategories
        : [mainCategories];
    }

    /* ---------- SORT ---------- */

    if (sortOrder !== undefined) {
      updates.sortOrder = Number(sortOrder);
    }

    /* ---------- LOGO ---------- */

    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        {
          folder: "brands",
          width: 400,
          height: 400
        }
      );

      updates.logo = uploaded.url;
    }

    const updated = await Brand.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/* ================= TOGGLE ================= */

exports.toggleBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Not found" });
    }
    brand.isActive = !brand.isActive;
    await brand.save();
    res.json({ isActive: brand.isActive });
  } catch (err) {
    next(err);
  }
};
