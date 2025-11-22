const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  sendWelcomeEmail,
  sendDailyInspirationEmail,
  sendEventAnnouncementEmail,
  sendServiceReminderEmail
} = require("../utils/email");

/**
 * ALL TEST ROUTES BELOW ARE:
 * - Protected
 * - Admin only
 */

// ---------------------------------------------
// Test: Welcome Email
// ---------------------------------------------
router.post(
  "/welcome",
  auth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { to, firstName } = req.body;

      if (!to || !firstName)
        return res.status(400).json({ error: "to and firstName are required" });

      const result = await sendWelcomeEmail(to, firstName);
      res.json({ message: "Welcome email sent", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ---------------------------------------------
// Test: Daily Inspiration Email
// ---------------------------------------------
router.post(
  "/daily",
  auth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { to, quote, author } = req.body;

      if (!to || !quote)
        return res.status(400).json({ error: "to and quote are required" });

      const result = await sendDailyInspirationEmail(to, quote, author);
      res.json({ message: "Daily inspiration email sent", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ---------------------------------------------
// Test: Event Announcement Email
// ---------------------------------------------
router.post(
  "/event",
  auth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { to, eventTitle, detailsHtml } = req.body;

      if (!to || !eventTitle || !detailsHtml)
        return res.status(400).json({ error: "to, eventTitle, detailsHtml required" });

      const result = await sendEventAnnouncementEmail(to, eventTitle, detailsHtml);
      res.json({ message: "Event announcement email sent", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ---------------------------------------------
// Test: Service Reminder Email
// ---------------------------------------------
router.post(
  "/reminder",
  auth,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { to, serviceName, dateTime, location } = req.body;

      if (!to || !serviceName || !dateTime)
        return res.status(400).json({ error: "to, serviceName, dateTime required" });

      const result = await sendServiceReminderEmail(
        to,
        serviceName,
        dateTime,
        location
      );
      res.json({ message: "Service reminder email sent", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
