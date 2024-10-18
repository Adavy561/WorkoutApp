const express = require("express");

const client = require("../middleware/s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

module.exports = async (req, res) => {
  try {
    const { key } = req.body;
    const input = {
      // GetObjectRequest
      Bucket: AWS_BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    // const response = await client.send(command);
    res.json({ url });
  } catch (error) {
    console.error("Error generating pre-signed URL", error);
    res.status(500).json({ error: "Failed to generate pre-signed URL" });
  }
};
