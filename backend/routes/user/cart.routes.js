const express = require("express");
const router = express.Router();
const accessAuth = require("../../middlewares/accessAuth.middleware")
const cartCtrl = require("../../controllers/cart.controller");

router.get("/",accessAuth(), cartCtrl.getCart);
router.post("/add",accessAuth(), cartCtrl.addToCart);
router.patch("/qty",accessAuth(), cartCtrl.updateQty);
router.delete("/item/:itemId",accessAuth(), cartCtrl.removeItem);
router.delete("/clear",accessAuth(), cartCtrl.clearCart);

module.exports = router;
