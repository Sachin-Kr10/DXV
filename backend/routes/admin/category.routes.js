const express = require("express");
const router = express.Router();

const { uploadSingle,uploadNone } = require("../../middlewares/upload.middleware");
const accessAuth = require("../../middlewares/accessAuth.middleware");
const role = require("../../middlewares/role.middleware");
const ctrl = require("../../controllers/category.controller");

/* ================= PUBLIC (FOR DROPDOWNS / FILTERS) ================= */
router.get("/main", ctrl.getMain);
router.get("/product", ctrl.getProd);
router.get("/sub", ctrl.getSub);

/* ================= ADMIN ================= */

// MAIN CATEGORY
router.post(
  "/main",
  accessAuth(),
  uploadNone(),
  ctrl.createMain
);

router.put(
  "/main/:id",
  accessAuth(),
  uploadNone(),
  ctrl.updateMain
);

router.delete(
  "/main/:id",
  accessAuth(),
  ctrl.deleteMain
);

router.post(
  "/product",
  accessAuth(),
  uploadSingle("image"),
  ctrl.createProd
);

router.put(
  "/product/:id",
  accessAuth(),
  uploadSingle("image"),
  ctrl.updateProd
);

router.patch(
  "/product/:id/toggle",
  accessAuth(),
  ctrl.toggleProd
);

router.post(
  "/sub",
  accessAuth(),
  uploadNone(),
  ctrl.createSub
);

router.put(
  "/sub/:id",
  accessAuth(),
  uploadNone(),
  ctrl.updateSub
);

router.delete(
  "/sub/:id",
  accessAuth(),
  ctrl.deleteSub
);

module.exports = router;
