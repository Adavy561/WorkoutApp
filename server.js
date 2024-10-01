const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const login = require("./login");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the Workout App API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/api/users/login", login);
