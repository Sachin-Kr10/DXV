const express = require("express");
const router = express.Router();

const accessAuth = require("../../middlewares/accessAuth.middleware");
const role = require("../../middlewares/role.middleware");

const {
  uploadAny
} = require("../../middlewares/upload.middleware");

const productController = require("../../controllers/adminProduct.controller");

/* ================= LIST ================= */
router.get(
  "/",
  accessAuth(),
  productController.getProducts
);

/* ================= CREATE ================= */
router.post(
  "/",
  accessAuth(),
  uploadAny(),                 // ✅ IMPORTANT
  productController.createProduct
);

/* ================= UPDATE ================= */
router.put(
  "/:id",
  accessAuth(),
  uploadAny(),                 // ✅ IMPORTANT
  productController.updateProduct
);

/* ================= TOGGLE ================= */
router.patch(
  "/:id/toggle",
  accessAuth(),
  productController.toggleProductStatus
);

/* ================= DELETE (OPTIONAL) ================= */
router.delete(
  "/:id",
  accessAuth(),
  productController.deleteProduct
);

module.exports = router;
