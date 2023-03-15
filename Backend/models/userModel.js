const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name Cannot Exceed 30 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Name"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password Should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  reserPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password, () => {});
};

module.exports = mongoose.model("User", userSchema);
