const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid access token" });
    }
  };
};
