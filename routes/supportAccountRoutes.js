const express = require("express");
const {
  createSupportAccount,
  updateSupportAccountStatus,
  checkSupportAccountStatus,
} = require("../controllers/supportAccountController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/support/apply").post(isAuthenticatedUser, createSupportAccount);
router
  .route("/support/updatestaus/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateSupportAccountStatus
  );
router
  .route("/support/checkstatus")
  .get(isAuthenticatedUser, checkSupportAccountStatus);

module.exports = router;