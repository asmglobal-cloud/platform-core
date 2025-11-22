// controllers/whatsappController.js

const {
  sendWhatsAppText,
  sendWhatsAppImage,
  sendWhatsAppTextImage
} = require("../utils/whatsapp");

// TEXT ONLY
exports.sendText = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing required fields: to, message" });
    }

    const result = await sendWhatsAppText(to, message);

    return res.json({
      message: "WhatsApp text sent",
      result: result.data
    });
  } catch (err) {
    console.error("WhatsApp text error:", err.response?.data || err.message);
    res.status(500).json({ error: "WhatsApp text failed" });
  }
};

// IMAGE ONLY
exports.sendImage = async (req, res) => {
  try {
    const { to, imageUrl, caption } = req.body;

    if (!to || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields: to, imageUrl" });
    }

    const result = await sendWhatsAppImage(to, imageUrl, caption);

    return res.json({
      message: "WhatsApp image sent",
      result: result.data
    });
  } catch (err) {
    console.error("WhatsApp image error:", err.response?.data || err.message);
    res.status(500).json({ error: "WhatsApp image failed" });
  }
};

// TEXT + IMAGE
exports.sendTextImage = async (req, res) => {
  try {
    const { to, message, imageUrl } = req.body;

    if (!to || !message || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields: to, message, imageUrl" });
    }

    const result = await sendWhatsAppTextImage(to, message, imageUrl);

    return res.json({
      message: "WhatsApp text + image sent",
      result: result.data
    });
  } catch (err) {
    console.error("WhatsApp text+image error:", err.response?.data || err.message);
    res.status(500).json({ error: "WhatsApp text+image failed" });
  }
};
