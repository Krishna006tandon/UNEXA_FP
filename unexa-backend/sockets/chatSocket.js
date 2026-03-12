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
      console.log(`User ${socket.id} joining chat room: ${chatId}`);
      if (chatId) {
        socket.join(chatId);
        console.log(`User ${socket.id} successfully joined room: ${chatId}`);
      }
    });

    socket.on("chat:typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("chat:typing", { chatId, userId });
    });

    socket.on("chat:message", async ({ chatId, senderId, content, mediaUrl, mediaType }) => {
      console.log('=== Socket received message ===');
      console.log('Chat ID:', chatId);
      console.log('Sender ID:', senderId);
      console.log('Content:', content);
      
      const message = await Message.create({
        chat: chatId,
        sender: senderId,
        content: content || "",
        mediaUrl: mediaUrl || "",
        mediaType: mediaType || "text",
      });
      
      console.log('Message created in DB:', message._id);
      
      await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
      const chat = await Chat.findById(chatId);
      const members = chat?.members || [];
      
      console.log('Chat members:', members);
      
      // Filter out null/undefined members before calling toString
      message.deliveredTo = members
        .filter((id) => id && id !== null && id !== undefined && id.toString() !== senderId)
        .map((id) => id);
      
      console.log('Delivered to:', message.deliveredTo);
      
      await message.save();
      
      console.log('Broadcasting message to room:', chatId);
      io.to(chatId).emit("chat:message", message);
      console.log('Message broadcasted successfully');
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
      const userId = rooms.find((room) => room !== socket.id && room && room !== 'null' && room !== 'undefined');
      if (userId) {
        await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        io.emit("user:status", { userId, isOnline: false });
      }
    });
  });
};

module.exports = { registerChatSockets };
