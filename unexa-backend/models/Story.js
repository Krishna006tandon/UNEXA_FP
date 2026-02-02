const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    closeFriendsOnly: { type: Boolean, default: false },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

storySchema.index({ user: 1, createdAt: -1 });

const Story = mongoose.model("Story", storySchema);

module.exports = { Story };
