const { Video } = require("../models/Video");
const { Notification } = require("../models/Notification");

const uploadVideo = async (req, res) => {
  const { title, description, tags, category, mediaUrl, thumbnailUrl, isShort } = req.body;
  const video = await Video.create({
    uploader: req.user._id,
    title,
    description,
    tags: tags || [],
    category,
    mediaUrl,
    thumbnailUrl,
    isShort: Boolean(isShort),
  });
  res.status(201).json(video);
};

const getTrendingVideos = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const videos = await Video.find({})
    .sort({ views: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("uploader", "username avatar");
  res.json({ page, limit, data: videos });
};

const getRecommendedVideos = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const skip = (page - 1) * limit;
  const videos = await Video.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("uploader", "username avatar");
  res.json({ page, limit, data: videos });
};

const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }
  const liked = video.likes.some((id) => id.toString() === req.user._id.toString());
  if (liked) {
    video.likes = video.likes.filter((id) => id.toString() !== req.user._id.toString());
  } else {
    video.likes.push(req.user._id);
    if (video.uploader.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: video.uploader,
        actor: req.user._id,
        type: "video",
        entityId: video._id,
        message: "liked your video",
      });
    }
  }
  await video.save();
  res.json(video);
};

const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }
  const disliked = video.dislikes.some((id) => id.toString() === req.user._id.toString());
  if (disliked) {
    video.dislikes = video.dislikes.filter((id) => id.toString() !== req.user._id.toString());
  } else {
    video.dislikes.push(req.user._id);
  }
  await video.save();
  res.json(video);
};

const commentVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }
  video.comments = video.comments || [];
  video.comments.push({ user: req.user._id, text: req.body.text });
  await video.save();
  res.json(video);
};

module.exports = {
  uploadVideo,
  getTrendingVideos,
  getRecommendedVideos,
  likeVideo,
  dislikeVideo,
  commentVideo,
};
