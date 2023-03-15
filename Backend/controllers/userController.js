const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "this_is_sample_profilr_url",
    },
  });

  sendToken(user, 201, res);
});

// Login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Your Email & Password", 400));
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const isPasswordMatch = user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});
