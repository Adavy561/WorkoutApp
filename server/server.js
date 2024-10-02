require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

app.use(cors());
app.use(express.json());

// auth middleware
const authMiddleWare = require("./middleware/jwtTokenAuth");
const jwtTokenRefresh = require("./middleware/jwtTokenRefresh");

app.get("/", (req, res) => {
  res.send("Welcome to the Workout App API!");
});

app.post("/api/users/login", require("./routes/login"));
app.post("/api/users/register", require("./routes/register"));
// app.get("/api/users/logout", require("./routes/logout"));
app.get("/api/users/refresh", jwtTokenRefresh, (req, res) => {});

app.get("/api/users/authtest", authMiddleWare, (req, res) => {
  res.send("authenticated");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
