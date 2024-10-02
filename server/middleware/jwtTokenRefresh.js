const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const refreshToken = req.body["refreshToken"];

  if (!refreshToken) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    if (!user) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({
      message: "New access token generated",
      token,
    });
  } catch (error) {
    // console.error("Error:", error);
    return res.status(403).json({
      error: "Invalid or expired refresh token",
    });
  }
};
