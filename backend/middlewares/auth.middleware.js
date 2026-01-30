const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        loggedIn: false
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id).select("-refreshToken");

    if (!user) {
      return res.status(401).json({
        loggedIn: false
      });
    }

    req.user = user;

    next();
  } catch {
    return res.status(401).json({
      loggedIn: false
    });
  }
};
