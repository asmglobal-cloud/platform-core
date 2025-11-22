const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// NEW WORKING EMAIL IMPORT (Replaces broken sendVerificationEmail)
const { sendWelcomeEmail } = require("../utils/email");

// JWT SIGN FUNCTION
function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ----------------------------------------------------
// REGISTER USER (ROLE CANNOT BE ASSIGNED BY USER)
// ----------------------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // 🔥 FORCE NEW USERS TO MEMBER ONLY
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "member",  // <-- ENFORCED
      isVerified: true
    });

    // SEND WELCOME EMAIL (temporary until verification is implemented)
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (err) {
      console.warn("Welcome email failed:", err.message);
    }

    return res.json({
      message: "User registered",
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// ----------------------------------------------------
// LOGIN USER
// ----------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: { [Op.iLike]: email } }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Incorrect password" });

    if (!user.isVerified)
      return res.status(400).json({ error: "Email not verified. Check your inbox." });

    const token = signToken(user);

    return res.json({ message: "Login successful", token, role: user.role });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
