const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

/* ---------------------------------------------------------
   TEMP ADMIN RESET (with password hashing)
----------------------------------------------------------*/
router.post("/reset-admin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const User = require("../models/User");
    const bcrypt = require("bcrypt");

    const admin = await User.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await admin.update({
      password: hashed,
      role: "admin",
      isVerified: true,
    });

    return res.json({ message: "Admin password reset successfully" });

  } catch (err) {
    console.error("Reset admin error:", err);
    return res.status(500).json({ error: "Reset failed" });
  }
});

module.exports = router;
