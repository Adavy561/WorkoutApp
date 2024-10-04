const uploadToS3 = async (file, s3) => {
  const params = {
    Bucket: "no-bs-videos-app",
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("Upload Success:", data.Location); // URL of the uploaded video
    return data.Location; // Return the video URL
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Video upload failed"); // Handle the error as needed
  }
};

module.exports = uploadToS3;
