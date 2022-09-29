const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//REGISTER A USER
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample",
      url: "profileUrl",
    },
  });

  sendToken(user, 201, res);
});

//LOGIN USER
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if your has given email or password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isPasswordMatched = user.conpirePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  sendToken(user, 200, res);
});
