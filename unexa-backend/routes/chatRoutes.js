const express = require("express");
const {
  createChat,
  getChats,
  getMessages,
  sendMessage,
  deleteMessageForAll,
} = require("../controllers/chatController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/", protect, createChat);
router.get("/", protect, getChats);
router.get("/:chatId/messages", protect, getMessages);
router.post("/:chatId/messages", protect, sendMessage);
router.delete("/:chatId/messages/:messageId", protect, deleteMessageForAll);

module.exports = { chatRoutes: router };
