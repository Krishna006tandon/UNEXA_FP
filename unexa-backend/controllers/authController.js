const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const signup = async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  
  // Make phone optional for frontend compatibility
  const searchQuery = phone ? 
    { $or: [{ email }, { phone }, { username }] } : 
    { $or: [{ email }, { username }] };
    
  const exists = await User.findOne(searchQuery);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }
  
  const hashed = password ? await bcrypt.hash(password, 10) : undefined;
  const userData = { name, username, email, password: hashed };
  if (phone) userData.phone = phone;
  
  const user = await User.create(userData);
  const token = generateToken({ id: user._id });
  user.sessions.push({ token, ip: req.ip, device: req.headers["user-agent"] });
  await user.save();
  return res.status(201).json({ token, user });
};

const requestOtp = async (req, res) => {
  const { phone, email } = req.body;
  const user = await User.findOne({ $or: [{ phone }, { email }] });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
  await user.save();
  return res.json({ message: "OTP generated", otp: code });
};

const loginWithOtp = async (req, res) => {
  const { phone, email, otp } = req.body;
  const user = await User.findOne({ $or: [{ phone }, { email }] });
  if (!user || !user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
    return res.status(401).json({ message: "Invalid OTP" });
  }
  const token = generateToken({ id: user._id });
  user.otp = undefined;
  user.sessions.push({ token, ip: req.ip, device: req.headers["user-agent"] });
  await user.save();
  return res.json({ token, user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken({ id: user._id });
  user.sessions.push({ token, ip: req.ip, device: req.headers["user-agent"] });
  await user.save();
  return res.json({ token, user });
};

const updateProfile = async (req, res) => {
  const updates = (({ name, username, bio, avatar }) => ({ name, username, bio, avatar }))(req.body);
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
  return res.json(user);
};

module.exports = { signup, login, requestOtp, loginWithOtp, updateProfile };
