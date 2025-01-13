const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route("/order/create").post(isAuthenticatedUser, createOrder);

module.exports = router;