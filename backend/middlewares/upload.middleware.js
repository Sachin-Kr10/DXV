const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

/* ---------- SINGLE IMAGE (Brand / Category) ---------- */
const uploadSingle = (field) => (req, res, next) => {
  upload.single(field)(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    next();
  });
};

/* ---------- MULTIPLE IMAGES (Product: 1–6) ---------- */
const uploadMultiple = (field, min = 1, max = 6) => (req, res, next) => {
  upload.array(field, max)(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.files || req.files.length < min) {
      return res
        .status(400)
        .json({ message: `Minimum ${min} image(s) required` });
    }

    if (req.files.length > max) {
      return res
        .status(400)
        .json({ message: `Maximum ${max} images allowed` });
    }

    next();
  });
};

const uploadAny = () => (req, res, next) => {
  upload.any()(req, res, err => {

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }

    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // ✅ Allow empty files (for update)
    if (!req.files || !req.files.length) {
      req.files = {};
      return next();
    }

    /* Group files by fieldname */
    const grouped = {};

    req.files.forEach(file => {
      if (!grouped[file.fieldname]) {
        grouped[file.fieldname] = [];
      }
      grouped[file.fieldname].push(file);
    });

    req.files = grouped;

    next();
  });
};

/* ---------- NO FILE (Form-Data Only) ---------- */
const uploadNone = () => (req, res, next) => {
  upload.none()(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};


module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadAny,
  uploadNone
};
