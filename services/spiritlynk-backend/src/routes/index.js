const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth");
const memberRoutes = require("./members");
const adminTestRoutes = require("./adminTest");
const testEmailRoutes = require("./testEmail");
const smsRoutes = require("./sms");
const whatsappRoutes = require("./whatsapp");
const roleRoutes = require("./roles"); // <-- NEW

// Mount routes
router.use("/auth", authRoutes);
router.use("/members", memberRoutes);
router.use("/admin", adminTestRoutes);
router.use("/test/email", testEmailRoutes);
router.use("/whatsapp", whatsappRoutes);
router.use("/sms", smsRoutes);
router.use("/roles", roleRoutes); // <-- NEW

// Debug Route
router.get("/debug", (req, res) => {
  res.json({ message: "Using correct backend", time: new Date() });
});

module.exports = router;
