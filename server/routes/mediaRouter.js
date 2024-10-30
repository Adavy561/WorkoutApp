const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const authMiddleWare = require("../middleware/jwtTokenAuth");

// Create
const upload = require("../controller/uploadMediaController");
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

// Read (Many & Single User)
router.get("/posts/feed", authMiddleWare, async (req, res) => {
  const { userId, page = 1, limit = 10 } = req.query;

  try {
    // Define query criteria
    const query = userId ? { user: userId } : {}; // Filter by user if userId is provided

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // Sort by newest posts
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("user", "username") // Include username if necessary
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;
