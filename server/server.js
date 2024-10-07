require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("./middleware/mongoose");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Workout App API!");
});

app.use("/api/users", require("./routes/authentication/authRouter"));
app.use("/api/workouts", require("./routes/uploadRouter/uploadRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
