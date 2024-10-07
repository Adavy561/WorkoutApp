const express = require("express");
const router = express.Router();

const register = require("./register");
const login = require("./login");

// auth middleware
const authMiddleWare = require("../../middleware/jwtTokenAuth");
const jwtTokenRefresh = require("../../middleware/jwtTokenRefresh");

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", jwtTokenRefresh, (req, res) => {});
router.get("/authtest", authMiddleWare, (req, res) => {
  res.send("authenticated");
});

// app.get("/api/users/logout", require("./routes/logout"));
module.exports = router;
