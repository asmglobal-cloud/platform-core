const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Accessible by all logged in users
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Your profile info",
    user: req.user
  });
});

// Only admin can access
router.get("/admin-only", auth, allowRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

// Only pastor can access
router.get("/pastor-only", auth, allowRoles("pastor"), (req, res) => {
  res.json({ message: "Welcome Pastor!" });
});

module.exports = router;
