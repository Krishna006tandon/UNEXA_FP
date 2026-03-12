const { Chat } = require("../models/Chat");
const { Message } = require("../models/Message");
const { BASE_URL } = process.env;

const createChat = async (req, res) => {
  const { members, name, isGroup } = req.body;
  
  // Filter out any null/undefined values and ensure req.user._id is included
  const allMembers = [req.user._id.toString(), ...(members || [])]
    .filter(id => id && id !== null && id !== undefined && id !== '');
  
  // Remove duplicates
  const uniqueMembers = Array.from(new Set(allMembers));
  
  if (uniqueMembers.length < 2) {
    return res.status(400).json({ message: "At least 2 valid members are required" });
  }
  
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

// Upload media to chat
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const mediaUrl = req.file.path;
    const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    
    res.json({
      success: true,
      mediaUrl,
      mediaType,
      filename: req.file.originalname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
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

module.exports = { createChat, getChats, getMessages, sendMessage, deleteMessageForAll, uploadMedia };
