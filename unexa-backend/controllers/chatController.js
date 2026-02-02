const { Chat } = require("../models/Chat");
const { Message } = require("../models/Message");

const createChat = async (req, res) => {
  const { members, name, isGroup } = req.body;
  const uniqueMembers = Array.from(new Set([req.user._id.toString(), ...(members || [])]));
  const chat = await Chat.create({ members: uniqueMembers, name, isGroup: Boolean(isGroup) });
  res.status(201).json(chat);
};

const getChats = async (req, res) => {
  const chats = await Chat.find({ members: req.user._id }).populate("lastMessage");
  res.json(chats);
};

const getMessages = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;
  const messages = await Message.find({ chat: req.params.chatId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sender", "username avatar");
  res.json({ page, limit, data: messages.reverse() });
};

const sendMessage = async (req, res) => {
  const { content, mediaUrl, mediaType } = req.body;
  const message = await Message.create({
    chat: req.params.chatId,
    sender: req.user._id,
    content,
    mediaUrl,
    mediaType: mediaType || "text",
  });
  await Chat.findByIdAndUpdate(req.params.chatId, { lastMessage: message._id });
  res.status(201).json(message);
};

const deleteMessageForAll = async (req, res) => {
  const message = await Message.findOne({ _id: req.params.messageId, sender: req.user._id });
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }
  message.content = "";
  message.mediaUrl = "";
  message.mediaType = "text";
  await message.save();
  res.json({ message: "Deleted" });
};

module.exports = { createChat, getChats, getMessages, sendMessage, deleteMessageForAll };
