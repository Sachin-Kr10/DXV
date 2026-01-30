const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/request-otp", authController.requestOtp);

router.post("/verify-otp", authController.verifyOtpAndAuth);

router.post("/refresh", authController.refreshAccessToken);

router.post("/logout", authController.logout);

router.post("/recover-email", authController.recoverEmail);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    loggedIn: true,
    user: req.user
  });
});

module.exports = router;
