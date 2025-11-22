const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/adminUserController");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

// -----------------------------
// ADMIN PROTECTED ROUTES
// -----------------------------

router.get("/", authMiddleware, adminOnly, getAllUsers);
router.get("/:id", authMiddleware, adminOnly, getUser);
router.put("/:id", authMiddleware, adminOnly, updateUser);
router.delete("/:id", authMiddleware, adminOnly, deleteUser);

module.exports = router;
