const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(403).json({
      error: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      error: "Invalid credentials",
    });
  }
  delete user.password;

  const userObject = user.toObject();
  const token = jwt.sign(userObject, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
  });

  res.json({
    message: "User logged in successfully",
    user,
    token,
  });

  // res.redirect("/dashboard");
};
