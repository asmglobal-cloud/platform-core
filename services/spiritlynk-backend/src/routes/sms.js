// src/routes/sms.js

const express = require("express");
const router = express.Router();
const { sendSMS } = require("../utils/sms");

/**
 * POST /api/v1/sms/send
 * Body: { phone: "+233...", message: "Hello" }
 */
router.post("/send", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: "Phone and message required" });
  }

  const result = await sendSMS(phone, message);

  if (!result) {
    return res.status(500).json({ error: "Failed to send SMS" });
  }

  res.json({ success: true, result });
});

module.exports = router;
