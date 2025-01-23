const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
const Product = require("../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const { userId, orderItems, paymentMethodId } = req.body;

    // Validate input fields
    if (!userId || !orderItems || !paymentMethodId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe requires amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // This will prevent redirection for unsupported payment methods
      },
    });
    // Create order first
    const order = new Order({
      user: userId,
      orderItems,
      totalAmount,
      paymentStatus:
        paymentIntent.status === "succeeded" ? "Completed" : "Failed",
      payment: null, // Set payment to null initially
    });
    const savedOrder = await order.save();

    // Now create payment with the order reference
    const payment = new Payment({
      order: savedOrder._id, // Update payment with the order reference
      user: userId,
      amount: totalAmount,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
    const savedPayment = await payment.save();

    // Update the order with the payment reference
    savedOrder.payment = savedPayment._id;
    await savedOrder.save();

    // Respond to client
    res.status(201).json({
      message: "Order created successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order.",
      error: error.message,
    });
  }
};
// get order by specific vendor
exports.getOrdersByVendor = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.params.vendorId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      message: "Failed to get orders.",
      error: error.message,
    });
  }
};
