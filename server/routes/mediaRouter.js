const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// auth middleware
const authMiddleWare = require("../middleware/jwtTokenAuth");
const viewMediaController = require("../controller/viewMediaController");

const upload = require("../controller/uploadMediaController");
// router.post("/upload", upload.single("file"), (req, res) => {
//   // authMiddleWare
//   try {
//     // File is successfully uploaded at this point
//     const file = req.file;
//     res.status(200).json({
//       message: "File uploaded successfully",
//       fileUrl: file.location, // The S3 URL of the uploaded file
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to upload file" });
//   }
// });

router.get("/view", viewMediaController);

const Post = require("../models/postSchema");
const User = require("../models/userSchema");
router.post(
  "/posts/create",
  authMiddleWare,
  upload.array("files"),
  async (req, res) => {
    try {
      const files = req.files;
      const videoUrls = [];
      const imageUrls = [];

      files.forEach((file) => {
        if (file.mimetype.startsWith("video/")) {
          videoUrls.push(file.location);
        } else if (file.mimetype.startsWith("image/")) {
          imageUrls.push(file.location);
        }
      });

      const newPost = new Post({
        description: req.body.description,
        user: req.user,
        videoUrls,
        imageUrls,
      });

      await User.findByIdAndUpdate(req.user, {
        $push: { posts: newPost._id },
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload post" });
    }
  }
);

module.exports = router;
