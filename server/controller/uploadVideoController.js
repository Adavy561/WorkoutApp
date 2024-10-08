require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

// const uploadToS3 = async (file, s3) => {
//   const params = {
//     Bucket: bucketName,
//     Key: `${Date.now()}-${file.originalname}`,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };

//   try {
//     const data = await s3.upload(params).promise();
//     console.log("Upload Success:", data.Location); // URL of the uploaded video
//     return data.Location; // Return the video URL
//   } catch (error) {
//     console.error("Error uploading video:", error);
//     throw new Error("Video upload failed"); // Handle the error as needed
//   }
// };

// const multer = require("multer");

// const uploadToS3 = require("./routes/uploadVideo");
// app.post("/api/videos/upload", authMiddleWare, async (req, res) => {
//   try {
//     const videoUrl = await uploadToS3(req.file, s3);
//     res.json({
//       message: "Video uploaded successfully",
//       url: videoUrl,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
