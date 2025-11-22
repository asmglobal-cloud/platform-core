const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth");
const memberRoutes = require("./members");
const adminTestRoutes = require("./adminTest");
const testEmailRoutes = require("./testEmail");   // <-- Added
const smsRoutes = require("./sms");

// Mount routes
router.use("/auth", authRoutes);
router.use("/members", memberRoutes);
router.use("/admin", adminTestRoutes);
router.use("/test/email", testEmailRoutes);       // <-- Added
router.use("/whatsapp", require("./whatsapp"));
router.use("/sms", smsRoutes);
// Debug Route
router.get("/debug", (req, res) => {
  res.json({ message: "Using correct backend", time: new Date() });
});

module.exports = router;
