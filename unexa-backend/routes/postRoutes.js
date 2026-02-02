const express = require("express");
const {
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
} = require("../controllers/postController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/home", protect, getHomeFeed);
router.get("/explore", protect, getExploreFeed);
router.get("/tags/trending", getTrendingTags);
router.get("/search", protect, searchPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);
router.post("/:id/comment/:commentId/reply", protect, replyComment);
router.post("/:id/save", protect, savePost);
router.post("/:id/report", protect, reportPost);

module.exports = { postRoutes: router };
