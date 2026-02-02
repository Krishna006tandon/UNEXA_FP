const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    token: String,
    ip: String,
    device: String,
    lastActive: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    otp: { code: String, expiresAt: Date },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    closeFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sessions: [sessionSchema],
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.index({ username: "text", name: "text" });

const User = mongoose.model("User", userSchema);

module.exports = { User };
