const express = require("express");
const router = express.Router();
const { updateRole } = require("../controllers/roleController");
const auth = require("../middleware/auth");
const authorizeRoles = require("../middleware/roleMiddleware");

// 🔐 Attach auth + only superadmin can change roles
router.post("/update", auth, authorizeRoles("superadmin"), updateRole);

module.exports = router;

