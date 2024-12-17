const sendToken = (user, statusCode, res, message) => {
  const token = user.getJwtToken();
  // Options for cookie setting
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set secure to true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    message,
    user,
  });
};
module.exports = sendToken;
