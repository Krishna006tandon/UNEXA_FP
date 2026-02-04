require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { initCloudinary } = require("./config/cloudinary");
const { authRoutes } = require("./routes/authRoutes");
const { postRoutes } = require("./routes/postRoutes");
const { chatRoutes } = require("./routes/chatRoutes");
const { storyRoutes } = require("./routes/storyRoutes");
const { videoRoutes } = require("./routes/videoRoutes");
const { notificationRoutes } = require("./routes/notificationRoutes");
const { userRoutes } = require("./routes/userRoutes");
const { registerChatSockets } = require("./sockets/chatSocket");
const { scheduleStoryExpiry } = require("./cron/storyExpiry");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

const PORT = process.env.PORT || 10000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
app.set("BASE_URL", BASE_URL);

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

connectDB();
initCloudinary();
registerChatSockets(io);
scheduleStoryExpiry();

app.get("/", (req, res) => {
  res.json({ status: "UNEXA backend running", baseUrl: BASE_URL });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`UNEXA backend listening on ${PORT}`);
});
