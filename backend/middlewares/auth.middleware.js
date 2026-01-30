const User = require("../models/user.model");
const Otp = require("../models/otp.model");

const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

const bcrypt = require("bcrypt");
const validator = require("validator");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../utils/token");

/* ================= REQUEST OTP ================= */

exports.requestOtp = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose)
      return res.status(400).json({ message: "Email and purpose required" });

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

    try {
      await sendEmail({
        to: email,
        subject: "Your OTP",
        text: `Your OTP is ${otp}`
      });
    } catch (err) {
      await Otp.deleteMany({ email, purpose });
      return res.status(500).json({ message: "Email sending failed" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

/* ================= VERIFY OTP ================= */

exports.verifyOtpAndAuth = async (req, res, next) => {
  try {
    const { email, otp, purpose, fullName, phone } = req.body;

    const otpDoc = await Otp.findOne({ email, purpose });

    if (!otpDoc)
      return res.status(400).json({ message: "Invalid OTP" });

    if (otpDoc.expiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    if (otpDoc.attempts >= 5)
      return res.status(429).json({ message: "Too many attempts" });

    const isMatch = await bcrypt.compare(otp, otpDoc.otp);

    if (!isMatch) {
      otpDoc.attempts += 1;
      await otpDoc.save();

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
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Authentication successful",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/* ================= REFRESH TOKEN ================= */

exports.refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token)
      return res.status(401).json({ message: "Missing refresh token" });

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

/* ================= LOGOUT ================= */

exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      const user = await User.findOne({ refreshToken: token });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
