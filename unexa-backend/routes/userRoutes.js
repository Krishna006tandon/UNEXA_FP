const express = require("express");
const {
  getProfile,
  followUser,
  getUserPosts,
  getUserStories,
  getUserVideos,
  searchUsers,
  getUserStats,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/search", protect, searchUsers);
router.get("/all", protect, getAllUsers);
router.get("/profile", protect, getProfile);
router.post("/:id/follow", protect, followUser);
router.get("/:id", protect, getProfile);
router.get("/:id/posts", protect, getUserPosts);
router.get("/:id/stories", protect, getUserStories);
router.get("/:id/videos", protect, getUserVideos);
router.get("/:id/stats", protect, getUserStats);

module.exports = { userRoutes: router };
