const express = require("express");
const router = express.Router();

// auth middleware
const authMiddleWare = require("../middleware/jwtTokenAuth");
const jwtTokenRefresh = require("../middleware/jwtTokenRefresh");

router.get("/refresh", (req, res) => {
  res.send("refreshed");
});
router.post("/upload", authMiddleWare, (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    // let uploadFile = req.files.file;
    // const fileName = req.files.file.name;
    // uploadFile.mv(`./uploads/${fileName}`, (err) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //   res.json({ fileName: fileName, filePath: `./uploads/${fileName}` });
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get("/api/users/logout", require("./routes/logout"));
module.exports = router;
