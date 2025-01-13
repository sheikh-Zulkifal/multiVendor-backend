const Order = require('../models/orderModel');
const Payment = require("../models/paymentModel")

exports.createOrder = async (req, res) => {
   try {
    const {products, totalAmount, paymentMethod} = req.body;
    const order = new Order({
      customer: req.user._id,
      products,
      totalAmount,
      payment: null,
    });
    const createdOrder = await order.save();
    
    
   } catch (error) {
     return res.status(500).json({ message: error.message });

    
   }
  };