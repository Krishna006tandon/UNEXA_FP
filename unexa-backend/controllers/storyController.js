const { Story } = require("../models/Story");
const { Notification } = require("../models/Notification");

const createStory = async (req, res) => {
  const { mediaUrl, mediaType, closeFriendsOnly } = req.body;
  const story = await Story.create({
    user: req.user._id,
    mediaUrl,
    mediaType,
    closeFriendsOnly: Boolean(closeFriendsOnly),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  res.status(201).json(story);
};

const getStories = async (req, res) => {
  const stories = await Story.find({ expiresAt: { $gt: new Date() } })
    .populate("user", "username avatar")
    .sort({ createdAt: -1 });
  res.json(stories);
};

const viewStory = async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }
  if (!story.viewers.includes(req.user._id)) {
    story.viewers.push(req.user._id);
    await story.save();
    await Notification.create({
      user: story.user,
      actor: req.user._id,
      type: "story_view",
      entityId: story._id,
      message: "viewed your story",
    });
  }
  res.json(story);
};

const reactStory = async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }
  story.reactions.push({ user: req.user._id, emoji: req.body.emoji || "❤️" });
  await story.save();
  res.json(story);
};

module.exports = { createStory, getStories, viewStory, reactStory };
