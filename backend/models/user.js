const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
    },

    phone: { 
      type: String, 
      required: true,
      trim: true,
    },

    country: { 
      type: String, 
      required: true,
      trim: true,
      default: "India",
     },

    address1: { 
      type: String, 
      required: true,
      trim:true,
    },

    address2: { 
      type: String,
      trim: true,
     },

    city: { 
      type: String, 
      required: true,
      trim:true,
    },

    state: { 
      type: String, 
      required: true,
      trim:true,
    },

    pincode: { 
      type: String, 
      required: true,
      trim:true,
    },

    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength:2,
      maxlength:40,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim:true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength:6,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index:true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ isBlocked: 1, role: 1 });

userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.pre("save", function (next) {
  if (!this.addresses?.length) return next();

  let foundDefault = false;

  this.addresses.forEach((addr) => {
    if (addr.isDefault) {
      if (!foundDefault) foundDefault = true;
      else addr.isDefault = false;
    }
  });

  next();
});

/* ---------- Methods: Login Security ---------- */
userSchema.methods.incLoginAttempts = function () {
  const MAX_ATTEMPTS = 5;
  const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      loginAttempts: 1,
      lockUntil: null,
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  if (this.loginAttempts + 1 >= MAX_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }

  return this.updateOne(updates);
};

module.exports = mongoose.model("User", userSchema);
