const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  
  console.log('Auth header received:', authHeader);
  console.log('Token extracted:', token ? 'Token present' : 'No token');
  
  if (!token) {
    console.log('No token provided - returning 401');
    return res.status(401).json({ message: "Not authorized" });
  }
  
  try {
    console.log('Attempting to verify token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully, user ID:', decoded.id);
    
    const user = await User.findById(decoded.id).select("-password");
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database - returning 401');
      return res.status(401).json({ message: "User not found" });
    }
    
    req.user = user;
    console.log('Authentication successful, proceeding to next middleware');
    return next();
  } catch (error) {
    console.log('Token verification failed:', error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
