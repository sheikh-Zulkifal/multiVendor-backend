const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles, isVendor } = require("../middleware/auth");
const { createVendor, getVendors } = require("../controllers/vendorController");

router.route("/vendor/create").post(isAuthenticatedUser,  createVendor);
router.route("/vendors/all").get(isAuthenticatedUser, authorizeRoles("admin"), getVendors);

exports.vendorRoute = router;