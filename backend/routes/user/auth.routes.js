const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const accessAuth = require("../../middlewares/accessAuth.middleware");


router.post("/request-otp", authController.requestOtp);

router.post("/verify-otp", authController.verifyOtpAndAuth);

router.post("/refresh", authController.refreshAccessToken);

router.post("/logout", authController.logout);

router.post("/recover-email", authController.recoverEmail);


router.get("/me", accessAuth(), (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
