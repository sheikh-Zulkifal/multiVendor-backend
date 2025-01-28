const Order = require("../models/orderModel");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

exports.addReview = async (req, res) => {
  try {
    const { productId, ratings, reviewText } = req.body;
    const customerId = req.user._id;

    // Check if the customer has a completed order for this product
    const completedOrder = await Order.findOne({
      customer: customerId,
      "products.product": productId,
      orderStatus: "Completed", // fisrt get all orders by customer then other work start
    });

    if (!completedOrder) {
      return res.status(400).json({
        message: "You can only review products from completed orders.",
      });
    }

    const existingReview = await Review.findOne({
      product: productId,
      customer: customerId,
    });
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product.",
      });
    }

    const review = new Review({
      product: productId,
      customer: customerId,
      ratings,
      reviewText,
    });

    await review.save();

    // Optionally, update product ratings average
    const reviews = await Review.find({ product: productId });
    const averageRating =
      reviews.reduce((acc, review) => acc + review.ratings, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, { averageRating });

    res.status(201).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
