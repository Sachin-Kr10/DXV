const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/auth.middleware');

router.post('/signup/send-otp', authController.sendSignupOtp);
router.post('/login/send-otp', authController.sendLoginOtp);
router.post('/signup/verify', authController.verifyOtp);
router.post('/login/verify', authController.verifyOtp);
router.post('/recover-email', authController.recoverEmail);
router.post('/resend-otp', authController.resendOtp);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;