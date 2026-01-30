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
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    phone: {
      type: String,
      unique : true,
      trim : true,
      match: [/^\d{10}$/, 'Phone number must be 10 digits']

    },

    role: {
      type: String,
      enum: ["user","admin","brand"],
      default: "user",
      index:true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false
    },

    emailVerification: Date,
    lastLogin:{
      type: Date
    },
    

    refreshToken :{
      type : String,
      select : false,
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },
    deletedAt: Date,
  },
  { timestamps: true },
);


// userSchema.pre("save", function (next) {
//   if (this.addresses?.length) {
//     const defaults = this.addresses.filter(a => a.isDefault);
//     if (defaults.length > 1) {
//       this.addresses.forEach(a => (a.isDefault = false));
//       this.addresses[0].isDefault = true;
//     }
//   }
//   next();
// });

userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
