const cron = require("node-cron");
const { Story } = require("../models/Story");

const scheduleStoryExpiry = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      await Story.deleteMany({ expiresAt: { $lte: new Date() } });
    } catch (error) {
      console.error("Story expiry cron error:", error.message);
    }
  });
};

module.exports = { scheduleStoryExpiry };
