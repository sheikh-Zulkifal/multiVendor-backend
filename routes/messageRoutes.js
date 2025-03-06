const express = require("express");
const router = express.Router();
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageContoller");
const { isAuthenticatedUser } = require("../middleware/auth");

router.get("/support/:sender/:receiver", isAuthenticatedUser, getMessages);
router.post("/support/send", isAuthenticatedUser, sendMessage);

module.exports = router;
