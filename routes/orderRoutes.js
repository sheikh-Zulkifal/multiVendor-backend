const express = require('express');
const { createOrder, getOrdersByVendor } = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route("/order/create").post(isAuthenticatedUser, createOrder);
router.route("/order/vendor/:vendorId").get(isAuthenticatedUser, getOrdersByVendor);

module.exports = router;