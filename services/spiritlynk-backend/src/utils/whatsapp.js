// utils/whatsapp.js
const axios = require("axios");

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;

// IMPORTANT: this MUST match Infobip "from" sender name exactly
const WHATSAPP_SENDER = "Asmglobal_cloud_Spiritlynk";

// Send WhatsApp TEXT ONLY
async function sendWhatsAppText(to, message) {
  const url = `${INFOBIP_BASE_URL}/whatsapp/1/message/text`;

  const payload = {
    from: WHATSAPP_SENDER,
    to,
    content: { text: message }
  };

  const headers = {
    Authorization: `App ${INFOBIP_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  return axios.post(url, payload, { headers });
}

// Send WhatsApp IMAGE ONLY
async function sendWhatsAppImage(to, imageUrl, caption = "") {
  const url = `${INFOBIP_BASE_URL}/whatsapp/1/message/image`;

  const payload = {
    from: WHATSAPP_SENDER,
    to,
    content: {
      image: {
        url: imageUrl,
        caption
      }
    }
  };

  const headers = {
    Authorization: `App ${INFOBIP_API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  return axios.post(url, payload, { headers });
}

module.exports = {
  sendWhatsAppText,
  sendWhatsAppImage
};
