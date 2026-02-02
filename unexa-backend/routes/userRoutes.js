const express = require("express");
const {
  getProfile,
  followUser,
  getUserPosts,
  getUserStories,
  getUserVideos,
  searchUsers,
} = require("../controllers/userController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/search", protect, searchUsers);
router.get("/:id", protect, getProfile);
router.post("/:id/follow", protect, followUser);
router.get("/:id/posts", protect, getUserPosts);
router.get("/:id/stories", protect, getUserStories);
router.get("/:id/videos", protect, getUserVideos);

module.exports = { userRoutes: router };
