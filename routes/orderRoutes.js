const express = require('express');
const { createOrder, getOrdersByVendor, changeOrderStatus } = require('../controllers/orderController');
const { isAuthenticatedUser, isVendor } = require('../middleware/auth');
const { getMyOrders } = require('../controllers/orderController');
const router = express.Router();

router.route ("/order/myorders").get(isAuthenticatedUser, getMyOrders);
router.route("/order/create").post(isAuthenticatedUser, createOrder);
router.route("/order/vendor").get(isAuthenticatedUser,isVendor, getOrdersByVendor);
router.route("/order/status").put(isAuthenticatedUser, isVendor, changeOrderStatus);

module.exports = router;