const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addReview } = require("../controllers/reviewController");

router.route("/review/new").post(isAuthenticatedUser, addReview);

module.exports = router;
