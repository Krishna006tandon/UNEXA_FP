const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    content: { type: String, default: "" },
    mediaUrl: { type: String, default: "" },
    mediaType: { type: String, enum: ["text", "image", "video", "file"], default: "text" },
    deliveredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
