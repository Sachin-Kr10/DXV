const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const bcrypt = require("bcrypt");
const validator = require("validator");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../utils/token");

const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

/* ================= REQUEST OTP ================= */
exports.requestOtp = async (req, res) => {
  try {
    let { email, purpose } = req.body;

    if (!email || !purpose)
      return res.status(400).json({ message: "Email and purpose required" });

    email = email.trim().toLowerCase();

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    const user = await User.findOne({ email });

    if (purpose === "login" && !user)
      return res.status(404).json({ message: "User not found" });

    if (purpose === "signup" && user)
      return res.status(409).json({ message: "User already exists" });

    await Otp.deleteMany({ email, purpose });

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      purpose,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendEmail({
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ================= VERIFY OTP + LOGIN ================= */
exports.verifyOtpAndAuth = async (req, res) => {
  try {
    let { email, otp, purpose, fullName, phone } = req.body;

    email = email.trim().toLowerCase();

    const otpDoc = await Otp.findOne({ email, purpose });
    if (!otpDoc || otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const validOtp = await bcrypt.compare(otp.toString(), otpDoc.otp);
    if (!validOtp) {
      return res.status(400).json({ message: "Wrong OTP" });
    }

    let user = await User.findOne({ email });

    if (purpose === "signup") {
      if (!fullName || !phone)
        return res.status(400).json({ message: "Missing fields" });

      if (user)
        return res.status(409).json({ message: "User already exists" });

      user = await User.create({
        fullName,
        email,
        phone,
        isEmailVerified: true
      });
    }

    if (!user)
      return res.status(404).json({ message: "User not found" });

    await Otp.deleteMany({ email, purpose });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

/* ================= REFRESH TOKEN ================= */
exports.refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    
    if (!token)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user);    

    res.json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Refresh failed" });
  }
};

/* ================= LOGOUT ================= */
exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      const user = await User.findOne({ refreshToken: token });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

/* ================= RECOVER EMAIL ================= */
exports.recoverEmail = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res.status(400).json({ message: "Phone required" });

    const user = await User.findOne({ phone });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
