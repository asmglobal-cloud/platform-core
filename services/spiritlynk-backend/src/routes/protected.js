const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// ✔ Accessible by ANY logged-in user
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user
  });
});

// ✔ ADMIN only
router.get("/admin", auth, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// ✔ PASTOR only
router.get("/pastor", auth, authorizeRoles("pastor"), (req, res) => {
  res.json({ message: "Welcome Pastor" });
});

module.exports = router;
