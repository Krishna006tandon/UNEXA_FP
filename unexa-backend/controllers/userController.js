const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Story } = require("../models/Story");
const { Video } = require("../models/Video");
const Fuse = require("fuse.js");

const getProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const followUser = async (req, res) => {
  const target = await User.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (!target) {
    return res.status(404).json({ message: "User not found" });
  }
  const already = user.following.some((id) => id.toString() === target._id.toString());
  if (already) {
    user.following = user.following.filter((id) => id.toString() !== target._id.toString());
    target.followers = target.followers.filter((id) => id.toString() !== user._id.toString());
  } else {
    user.following.push(target._id);
    target.followers.push(user._id);
  }
  await user.save();
  await target.save();
  res.json({ following: user.following });
};

const getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
  res.json(posts);
};

const getUserStories = async (req, res) => {
  const stories = await Story.find({ user: req.params.id, expiresAt: { $gt: new Date() } });
  res.json(stories);
};

const getUserVideos = async (req, res) => {
  const videos = await Video.find({ uploader: req.params.id }).sort({ createdAt: -1 });
  res.json(videos);
};

const searchUsers = async (req, res) => {
  const query = req.query.q || "";
  const users = await User.find().select("username name avatar");
  const fuse = new Fuse(users, { keys: ["username", "name"], threshold: 0.4 });
  const results = fuse.search(query).map((item) => item.item);
  res.json(results);
};

module.exports = { getProfile, followUser, getUserPosts, getUserStories, getUserVideos, searchUsers };
