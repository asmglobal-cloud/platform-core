const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // 🔥 1. Check if it matches the dev master token (never expires)
  if (process.env.DEV_MASTER_JWT && token === process.env.DEV_MASTER_JWT) {
    req.user = {
      id: "dev-master",
      email: "devadmin@spiritlynk.com",
      role: "admin"
    };
    return next();
  }

  try {
    // 🔥 2. Normal token verification
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SpiritLynkSecret2025"
    );

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
