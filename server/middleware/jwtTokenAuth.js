const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};
