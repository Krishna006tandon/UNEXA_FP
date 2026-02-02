const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { Notification } = require("../models/Notification");

const createPost = async (req, res) => {
  const { caption, tags, mediaUrl, mediaType } = req.body;
  const post = await Post.create({
    author: req.user._id,
    caption,
    tags: tags || [],
    mediaUrl,
    mediaType,
  });
  res.status(201).json(post);
};

const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { caption: req.body.caption, tags: req.body.tags },
    { new: true }
  );
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.json(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.json({ message: "Post deleted" });
};

const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const hasLiked = post.likes.some((id) => id.toString() === req.user._id.toString());
  if (hasLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
  } else {
    post.likes.push(req.user._id);
    if (post.author.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: post.author,
        actor: req.user._id,
        type: "like",
        entityId: post._id,
        message: "liked your post",
      });
    }
  }
  await post.save();
  return res.json(post);
};

const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  post.comments.push({ user: req.user._id, text: req.body.text, replies: [] });
  await post.save();
  if (post.author.toString() !== req.user._id.toString()) {
    await Notification.create({
      user: post.author,
      actor: req.user._id,
      type: "comment",
      entityId: post._id,
      message: "commented on your post",
    });
  }
  return res.status(201).json(post);
};

const replyComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = post.comments.id(req.params.commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  comment.replies.push({ user: req.user._id, text: req.body.text });
  await post.save();
  return res.json(post);
};

const savePost = async (req, res) => {
  const user = await User.findById(req.user._id);
  const already = user.savedPosts.some((id) => id.toString() === req.params.id);
  if (already) {
    user.savedPosts = user.savedPosts.filter((id) => id.toString() !== req.params.id);
  } else {
    user.savedPosts.push(req.params.id);
  }
  await user.save();
  return res.json({ savedPosts: user.savedPosts });
};

const reportPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  post.reports.push({ user: req.user._id, reason: req.body.reason });
  await post.save();
  return res.json({ message: "Reported" });
};

const getHomeFeed = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const user = await User.findById(req.user._id);
  const feed = await Post.find({ author: { $in: [req.user._id, ...user.following] } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "username avatar");
  res.json({ page, limit, data: feed });
};

const getExploreFeed = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const feed = await Post.find({})
    .sort({ likes: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "username avatar");
  res.json({ page, limit, data: feed });
};

const getTrendingTags = async (req, res) => {
  const tags = await Post.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);
  res.json(tags);
};

const searchPosts = async (req, res) => {
  const query = req.query.q || "";
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const regex = new RegExp(query, "i");
  const posts = await Post.find({ $or: [{ caption: regex }, { tags: { $in: [regex] } }] })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "username avatar");
  res.json({ page, limit, data: posts });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  replyComment,
  savePost,
  reportPost,
  getHomeFeed,
  getExploreFeed,
  getTrendingTags,
  searchPosts,
};
