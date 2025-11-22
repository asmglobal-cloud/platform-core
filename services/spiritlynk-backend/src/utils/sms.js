// services/spiritlynk-backend/src/utils/sms.js

const axios = require("axios");

const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;      // e.g. https://xxyy.api.infobip.com
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;        // Infobip API Key
const INFOBIP_SMS_SENDER = process.env.INFOBIP_SMS_SENDER || "SpiritLynk";

/**
 * Generic SMS Sender
 * @param {string} toPhone
 * @param {string} message
 */
async function sendSMS(toPhone, message) {
  if (!INFOBIP_API_KEY || !INFOBIP_BASE_URL) {
    console.warn("⚠ INFOBIP credentials missing — SMS not sent");
    return false;
  }

  const url = `${INFOBIP_BASE_URL}/sms/2/text/advanced`;

  const payload = {
    messages: [
      {
        from: INFOBIP_SMS_SENDER,
        destinations: [{ to: toPhone }],
        text: message,
      },
    ],
  };

  try {
    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `App ${INFOBIP_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return res.data;
  } catch (err) {
    console.error("❌ SMS sending failed:", err.response?.data || err.message);
    return false;
  }
}

/**
 * Welcome SMS — Uses the generic SMS sender
 */
async function sendWelcomeSMS(toPhone, firstName) {
  const message = `Welcome ${firstName} to SpiritLynk Hub! We're glad you're here. — SpiritLynk`;

  return await sendSMS(toPhone, message);
}

module.exports = {
  sendSMS,
  sendWelcomeSMS,
};
