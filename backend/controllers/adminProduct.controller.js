const Product = require("../models/product.model.js");
const uploadToCloudinary = require("../utils/cloudinary");
const slugify = require("slugify");

/* ================= CREATE ================= */

exports.createProduct = async (req, res, next) => {
  try {

    const {
      title,
      brand,
      mainCategory,
      prodCategory,
      subCategory,
      price,
      mrp,
      description = "",
      featuredScore = 0,
      design = "solid",
      fit = "regular",
      variants
    } = req.body;

    if (
      !title ||
      !brand ||
      !mainCategory ||
      !prodCategory ||
      !price ||
      !mrp ||
      !variants
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const exists = await Product.exists({ slug });

    if (exists) {
      return res.status(409).json({ message: "Product exists" });
    }

    let parsed;

    try {
      parsed = JSON.parse(variants);
    } catch {
      return res.status(400).json({ message: "Invalid variants" });
    }

    if (!Array.isArray(parsed) || !parsed.length) {
      return res.status(400).json({ message: "Invalid variants" });
    }

    if (!req.files) {
      return res.status(400).json({ message: "Images required" });
    }

    const finalVariants = [];

    for (let i = 0; i < parsed.length; i++) {

      const v = parsed[i];
      const files = req.files[`variantImages_${i}`];

      if (!files || files.length < 1 || files.length > 6) {
        return res.status(400).json({
          message: `${v.colorName} needs 1–6 images`
        });
      }

      const uploads = await Promise.all(
        files.map(f =>
          uploadToCloudinary(f.buffer, "products")
        )
      );

      finalVariants.push({
        colorName: v.colorName.toLowerCase(),
        colorHex: v.colorHex.toUpperCase(),
        images: uploads.map(i => i.url),
        sizes: v.sizes.map(s => ({
          size: String(s.size).toUpperCase(),
          stock: Number(s.stock)
        }))
      });
    }

    const product = await Product.create({
      title: title.trim(),
      slug,
      brand: brand.toLowerCase(),
      mainCategory: mainCategory.toLowerCase(),
      prodCategory: prodCategory.toLowerCase(),
      subCategory: subCategory?.toLowerCase() || null,
      price,
      mrp,
      description,
      featuredScore,
      design,
      fit,
      variants: finalVariants
    });

    res.status(201).json(product);

  } catch (err) {
    next(err);
  }
};


/* ================= LIST ================= */

exports.getProducts = async (req, res, next) => {
  try {

    const {
      page = 1,
      limit = 30,
      isActive,
      brand,
      mainCategory,
      color
    } = req.query;

    const filter = {};

    if (isActive !== undefined)
      filter.isActive = isActive === "true";

    if (brand) filter.brand = brand.toLowerCase();
    if (mainCategory) filter.mainCategory = mainCategory.toLowerCase();

    if (color) {
      filter.variants = {
        $elemMatch: { colorName: color.toLowerCase() }
      };
    }

    const [products, total] = await Promise.all([

      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(+limit)
        .lean(),

      Product.countDocuments(filter)

    ]);

    res.json({
      data: products,
      total,
      page: +page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    next(err);
  }
};


/* ================= UPDATE ================= */

exports.updateProduct = async (req, res, next) => {
  try {

    const id = req.params.id;

    const old = await Product.findById(id).lean();

    if (!old) {
      return res.status(404).json({ message: "Not found" });
    }

    const updates = {};

    const fields = [
      "title",
      "brand",
      "mainCategory",
      "prodCategory",
      "subCategory",
      "price",
      "mrp",
      "description",
      "featuredScore",
      "design",
      "fit"
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        updates[f] = req.body[f];
      }
    });

    if (updates.title) {
      updates.slug = slugify(updates.title, {
        lower: true,
        strict: true
      });
    }

    /* ---------- VARIANTS ---------- */

    if (req.body.variants) {

      let parsed = JSON.parse(req.body.variants);

      const oldMap = new Map();

      old.variants.forEach(v => {
        oldMap.set(v.colorName, v.images);
      });

      const final = [];

      for (let i = 0; i < parsed.length; i++) {

        const v = parsed[i];
        const files = req.files?.[`variantImages_${i}`];

        let images = oldMap.get(v.colorName.toLowerCase()) || [];

        if (files?.length) {

          const uploads = await Promise.all(
            files.map(f =>
              uploadToCloudinary(f.buffer, "products")
            )
          );

          images = uploads.map(i => i.url);
        }

        final.push({
          colorName: v.colorName.toLowerCase(),
          colorHex: v.colorHex.toUpperCase(),
          images,
          sizes: v.sizes.map(s => ({
            size: String(s.size).toUpperCase(),
            stock: Number(s.stock)
          }))
        });
      }

      updates.variants = final;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(product);

  } catch (err) {
    next(err);
  }
};


/* ================= TOGGLE ================= */

exports.toggleProductStatus = async (req, res, next) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $bit: { isActive: { xor: 1 } } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ isActive: product.isActive });

  } catch (err) {
    next(err);
  }
};


/* ================= DELETE ================= */

exports.deleteProduct = async (req, res, next) => {
  try {

    const deleted = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted" });

  } catch (err) {
    next(err);
  }
};
