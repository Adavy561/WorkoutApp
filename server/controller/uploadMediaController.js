require("dotenv").config();

const multer = require("multer");
const multerS3 = require("multer-s3");
const bucketName = process.env.AWS_BUCKET_NAME;

s3 = require("../middleware/s3");
// const path = require("path");
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // const ext = path.extname(file.originalname);
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
});

module.exports = upload;
