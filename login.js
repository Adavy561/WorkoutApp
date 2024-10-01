const jwt = require("jsonwebtoken");

const getUser = async (username) => {
  return { userid: 123, password: "123456", username };
};

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user.password !== password) {
    return res.status(403).json({
      error: "Invalid credentials",
    });
  }

  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
  });

  res.json({
    message: "User logged in successfully",
    user,
    token,
  });
};
