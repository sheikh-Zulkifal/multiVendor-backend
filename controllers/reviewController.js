const Order = require("../models/orderModel");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

exports.addReview = async (req, res) => {
  try {
    const { productId, ratings, reviewText } = req.body;
    const userId = req.user._id;

    const completedOrder = await Order.findOne({
      user: userId,
      "orderItems.product": productId, // This is incorrect
      orderStatus: "Completed",
    });
    if (!completedOrder) {
      return res.status(400).json({
        message: "You can only review products from completed orders.",
      });
    }

    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product.",
      });
    }

    const review = new Review({
      product: productId,
      user: userId,
      ratings,
      reviewText,
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
