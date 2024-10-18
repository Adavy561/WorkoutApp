const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  videoUrl: [String],
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
