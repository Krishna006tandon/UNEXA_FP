const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const buildStorage = (folder, resourceType = "image") => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: resourceType,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
      transformation: resourceType === "video" ? [{ quality: "auto" }] : [{ quality: "auto:best" }],
    },
  });
};

const imageUpload = multer({ storage: buildStorage("unexa/images", "image") });
const videoUpload = multer({ storage: buildStorage("unexa/videos", "video") });
const mixedUpload = multer({ storage: buildStorage("unexa/media", "auto") });

module.exports = { imageUpload, videoUpload, mixedUpload };
