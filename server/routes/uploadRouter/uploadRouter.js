const express = require("express");
const router = express.Router();

// auth middleware
const authMiddleWare = require("../../middleware/jwtTokenAuth");
const jwtTokenRefresh = require("../../middleware/jwtTokenRefresh");

// router.post("/register", register);

// app.get("/api/users/logout", require("./routes/logout"));
module.exports = router;
