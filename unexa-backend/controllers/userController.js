const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Story } = require("../models/Story");
const { Video } = require("../models/Video");
const Fuse = require("fuse.js");

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
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

const getAllUsers = async (req, res) => {
  try {
    console.log('=== getAllUsers called ===');
    console.log('User ID:', req.user._id);
    console.log('User object:', JSON.stringify(req.user, null, 2));
    
    // Get all users except the current user
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password") // Exclude password field
      .limit(50); // Limit for performance
    
    console.log(`Found ${users.length} users`);
    console.log('First user:', users[0] ? users[0].username : 'None');
    
    res.json(users);
  } catch (error) {
    console.error('=== getAllUsers ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Request user:', req.user ? req.user._id : 'No user');
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const query = req.query.q || "";
    
    // If query is empty or just whitespace, return all users
    if (!query || query.trim() === "") {
      const users = await User.find().select("-password").limit(50);
      return res.json(users);
    }
    
    const users = await User.find().select("username name avatar");
    const fuse = new Fuse(users, { keys: ["username", "name"], threshold: 0.4 });
    const results = fuse.search(query).map((item) => item.item);
    res.json(results);
  } catch (error) {
    console.error('Error in searchUsers:', error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;
    const [postsCount, followersCount, followingCount] = await Promise.all([
      Post.countDocuments({ author: userId }),
      User.findById(userId).then(user => user ? user.followers.length : 0),
      User.findById(userId).then(user => user ? user.following.length : 0)
    ]);
    
    res.json({
      posts: postsCount,
      followers: followersCount,
      following: followingCount
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProfile, followUser, getUserPosts, getUserStories, getUserVideos, searchUsers, getUserStats, getAllUsers };
