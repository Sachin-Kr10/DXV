const express = require("express");
const router = express.Router();

const { uploadSingle } = require("../../middlewares/upload.middleware");
const accessAuth = require("../../middlewares/accessAuth.middleware");
const role = require("../../middlewares/role.middleware");

const brandCtrl = require("../../controllers/brand.controller");

/* ================= PUBLIC ================= */
// (Optional: if brands should be visible publicly)
router.get("/", brandCtrl.getBrands);

/* ================= ADMIN ================= */
router.post(
  "/",
  accessAuth(),
  uploadSingle("logo"),
  brandCtrl.createBrand
);

router.put(
  "/:id",
  accessAuth(),
  uploadSingle("logo"),
  brandCtrl.updateBrand
);

router.patch(
  "/:id/toggle",
  accessAuth(),
  brandCtrl.toggleBrand
);

module.exports = router;
