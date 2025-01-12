const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const CustomError = require("../utils/errorHandler");
const Vendor = require("../models/vendorModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return next(new CustomError("please login to access this resources", 401));
  }

  try {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decodedData.id });
  } catch (err) {
    return next(new CustomError("User not found with this id", 404));
  }
  next();
});

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new CustomError(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.isVendor = catchAsyncError(async (req, res, next) => {
  try {
    const { user } = req;
    if (user.role !== "vendor") {
      throw new CustomError("You are not allowed to access this resource", 403);
    }
    const vendor = await Vendor.findOne({ userId: user._id });
    if (!vendor) {
      throw new CustomError("You are not a vendor", 403);
    }
    if (vendor.status !== "verified") {
      throw new CustomError("Your account is not verified", 403);
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});
