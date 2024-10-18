const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
// aws.config.update();

// const s3 = new aws.S3();

module.exports = s3Client;
