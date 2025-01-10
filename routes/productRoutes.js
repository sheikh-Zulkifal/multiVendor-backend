const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addProduct } = require("../controllers/productController");

router
  .route("/products/create")
  .post(isAuthenticatedUser, authorizeRoles("vendor"), addProduct);

module.exports = router;
