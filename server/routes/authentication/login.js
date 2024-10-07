const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

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
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(userObject, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "User logged in successfully",
    user,
    token,
    refreshToken,
  });

  // res.redirect("/dashboard");
};
