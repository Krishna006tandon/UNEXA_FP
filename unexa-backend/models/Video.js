const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const videoSchema = new mongoose.Schema(
  {
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: "" },
    tags: [{ type: String, index: true }],
    category: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    isShort: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true }
);

videoSchema.index({ tags: 1, createdAt: -1 });

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
