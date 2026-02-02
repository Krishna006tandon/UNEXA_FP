const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Missing MONGO_URI");
    return;
  }
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = { connectDB };
