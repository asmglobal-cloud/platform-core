const User = require("../models/User");

// -------------------------------------------------------------
// UPDATE USER ROLE (TEMP: OPEN ACCESS UNTIL AUTH IS ADDED)
// -------------------------------------------------------------
exports.updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ error: "userId and role are required" });
    }

    // Allowed roles
    const allowedRoles = ["member", "admin", "pastor", "staff", "visitor", "superadmin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // 🔥 TEMPORARY OVERRIDE — will remove when auth middleware is added
    console.log("⚠ WARNING: Role update bypassing auth (TEMP MODE)");

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ role });
    return res.json({
      message: "Role updated (TEMP MODE)",
      user
    });

  } catch (err) {
    console.error("Role update error:", err);
    res.status(500).json({ error: "Role update failed" });
  }
};
