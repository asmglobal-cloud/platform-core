const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createMember,
  listMembers,
  getMember,
  updateMember,
  deleteMember,
  searchMembers,
  importMembers,
  exportMembersCSV
} = require("../controllers/memberController");

// ---------------------------------------------
// 🔍 SEARCH MEMBERS (Admin + Pastor)
// ---------------------------------------------
router.get(
  "/search",
  auth,
  authorizeRoles("admin", "pastor"),
  searchMembers
);

// ---------------------------------------------
// 📥 IMPORT MEMBERS FROM CSV (Admin only)
// ---------------------------------------------
router.post(
  "/import-csv",
  auth,
  authorizeRoles("admin"),
  upload.single("file"),
  importMembers
);

// ---------------------------------------------
// 📤 EXPORT MEMBERS AS CSV (Admin + Pastor)
// ---------------------------------------------
router.get(
  "/export/csv",
  auth,
  authorizeRoles("admin", "pastor"),
  exportMembersCSV
);

// ---------------------------------------------
// ➕ CREATE MEMBER
// ---------------------------------------------
router.post(
  "/",
  auth,
  authorizeRoles("admin", "pastor"),
  createMember
);

// ---------------------------------------------
// 📄 LIST MEMBERS
// ---------------------------------------------
router.get(
  "/",
  auth,
  authorizeRoles("admin", "pastor"),
  listMembers
);

// ---------------------------------------------
// 📌 GET SINGLE MEMBER
// ---------------------------------------------
router.get(
  "/:id",
  auth,
  authorizeRoles("admin", "pastor"),
  getMember
);

// ---------------------------------------------
// ✏ UPDATE MEMBER
// ---------------------------------------------
router.put(
  "/:id",
  auth,
  authorizeRoles("admin", "pastor"),
  updateMember
);

// ---------------------------------------------
// ❌ DELETE MEMBER (Admin only)
// ---------------------------------------------
router.delete(
  "/:id",
  auth,
  authorizeRoles("admin"),
  deleteMember
);

module.exports = router;
