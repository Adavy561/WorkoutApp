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

const login = require("./routes/login");
const register = require("./routes/register");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Workout App API!");
});

app.post("/api/users/login", login);
app.post("/api/users/register", register);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
