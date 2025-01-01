const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { registerUser, loginUser, getUserById, deleteUser } = require("../controllers/userController");

router.route("/users/register").post(registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserById);
router.route("/users/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;