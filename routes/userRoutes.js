const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { register, login } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);


module.exports = router;