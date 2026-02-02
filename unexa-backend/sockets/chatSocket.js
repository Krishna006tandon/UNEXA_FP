const { Chat } = require("../models/Chat");
const { Message } = require("../models/Message");
const { User } = require("../models/User");

const registerChatSockets = (io) => {
  io.on("connection", (socket) => {
    socket.on("user:online", async ({ userId }) => {
      if (!userId) return;
      await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: new Date() });
      socket.join(userId);
      io.emit("user:status", { userId, isOnline: true });
    });

    socket.on("chat:join", ({ chatId }) => {
      if (chatId) socket.join(chatId);
    });

    socket.on("chat:typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("chat:typing", { chatId, userId });
    });

    socket.on("chat:message", async ({ chatId, senderId, content, mediaUrl, mediaType }) => {
      const message = await Message.create({
        chat: chatId,
        sender: senderId,
        content: content || "",
        mediaUrl: mediaUrl || "",
        mediaType: mediaType || "text",
      });
      await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
      const chat = await Chat.findById(chatId);
      const members = chat?.members || [];
      message.deliveredTo = members.filter((id) => id.toString() !== senderId);
      await message.save();
      io.to(chatId).emit("chat:message", message);
    });

    socket.on("chat:read", async ({ chatId, userId }) => {
      await Message.updateMany(
        { chat: chatId, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
      );
      io.to(chatId).emit("chat:read", { chatId, userId });
    });

    socket.on("disconnecting", async () => {
      const rooms = Array.from(socket.rooms);
      const userId = rooms.find((room) => room !== socket.id);
      if (userId) {
        await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        io.emit("user:status", { userId, isOnline: false });
      }
    });
  });
};

module.exports = { registerChatSockets };
