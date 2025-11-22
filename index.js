const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const memberRoutes = require("./members");
const adminRoutes = require("./admin");

// Auth routes
router.use("/auth", authRoutes);

// Members routes
router.use("/members", memberRoutes);

// Admin routes
router.use("/admin", adminRoutes);

module.exports = router;
