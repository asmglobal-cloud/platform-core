// routes/whatsapp.js
const express = require("express");
const router = express.Router();
const {
  sendText,
  sendImage,
  sendTextImage
} = require("../controllers/whatsappController");

router.post("/text", sendText);
router.post("/image", sendImage);
router.post("/text-image", sendTextImage);

module.exports = router;
