const express = require("express");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
  isVendor,
} = require("../middleware/auth");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsByVendor,
} = require("../controllers/productController");

router
  .route("/products/create")
  .post(isAuthenticatedUser, isVendor, addProduct);
router
  .route("/products/update/:productId")
  .put(isAuthenticatedUser, isVendor, updateProduct);
router
  .route("/products/delete/:productId")
  .delete(isAuthenticatedUser, isVendor, deleteProduct);
router.route("/products").get(isAuthenticatedUser, getProducts);
router
  .route("/products/:vendorId")
  .get(isAuthenticatedUser, getProductsByVendor);

module.exports = router;
