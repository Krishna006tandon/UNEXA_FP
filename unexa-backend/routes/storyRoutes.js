const express = require("express");
const { createStory, getStories, viewStory, reactStory } = require("../controllers/storyController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", protect, getStories);
router.post("/", protect, createStory);
router.post("/:id/view", protect, viewStory);
router.post("/:id/react", protect, reactStory);

module.exports = { storyRoutes: router };
