const express = require("express");
const {
  uploadVideo,
  getTrendingVideos,
  getRecommendedVideos,
  likeVideo,
  dislikeVideo,
  commentVideo,
} = require("../controllers/videoController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/trending", getTrendingVideos);
router.get("/recommended", getRecommendedVideos);
router.post("/", protect, uploadVideo);
router.post("/:id/like", protect, likeVideo);
router.post("/:id/dislike", protect, dislikeVideo);
router.post("/:id/comment", protect, commentVideo);

module.exports = { videoRoutes: router };
