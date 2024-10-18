const express = require("express");
const router = express.Router();

// auth middleware
const authMiddleWare = require("../middleware/jwtTokenAuth");
const viewMediaController = require("../controller/viewMediaController");

const upload = require("../controller/uploadMediaController");
router.post("/upload", upload.single("file"), (req, res) => {
  // authMiddleWare
  try {
    // File is successfully uploaded at this point
    const file = req.file;
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: file.location, // The S3 URL of the uploaded file
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

router.get("/view", viewMediaController);

module.exports = router;
