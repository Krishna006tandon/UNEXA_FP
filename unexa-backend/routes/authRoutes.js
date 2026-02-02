const express = require("express");
const { signup, login, requestOtp, loginWithOtp, updateProfile } = require("../controllers/authController");
const { protect } = require("../utils/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/otp/request", requestOtp);
router.post("/otp/login", loginWithOtp);
router.put("/profile", protect, updateProfile);

module.exports = { authRoutes: router };
