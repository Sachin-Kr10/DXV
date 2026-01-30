const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 60
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },
    role: {
      type: String,
      enum: ["user", "admin", "brand"],
      default: "user"
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: {
  type: String,
  default: null
}

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
