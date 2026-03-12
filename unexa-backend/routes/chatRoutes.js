const express = require("express");
const {
  createChat,
  getChats,
  getMessages,
  sendMessage,
  deleteMessageForAll,
} = require("../controllers/chatController");
const { protect } = require("../utils/authMiddleware");
const { imageUpload, videoUpload } = require("../utils/uploadMiddleware");
const { uploadMedia } = require("../controllers/chatController");

const router = express.Router();

router.post("/", protect, createChat);
router.get("/", protect, getChats);
router.get("/:chatId/messages", protect, getMessages);
router.post("/:chatId/messages", protect, sendMessage);
router.delete("/:chatId/messages/:messageId", protect, deleteMessageForAll);
// Media upload route for chat
router.post("/:chatId/media", protect, imageUpload.single('media'), uploadMedia);

module.exports = { chatRoutes: router };
