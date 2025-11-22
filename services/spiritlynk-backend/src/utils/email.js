// services/.../src/utils/email.js
// Simple HTML email utility with plain-text fallback using nodemailer

const nodemailer = require("nodemailer");

/**
 * Required env vars:
 * EMAIL_HOST
 * EMAIL_PORT
 * EMAIL_USER
 * EMAIL_PASS
 * EMAIL_FROM (optional, defaults to EMAIL_USER)
 */

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: process.env.EMAIL_SECURE === "true" || false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
  tls: {
    rejectUnauthorized: process.env.EMAIL_REJECT_UNAUTHORIZED !== "false" // default true
  }
});

// -- Generic text fallback generator
function textFallbackFromHtml(html) {
  // Very small HTML→text fallback: strip tags and decode basic entities
  return html
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

// -- Basic layout wrapper for HTML emails
function wrapHtml(subject, bodyHtml) {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${subject}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color:#111; margin:0; padding:0; background:#f4f6f8; }
      .container { width:100%; max-width:680px; margin:28px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 4px 18px rgba(16,24,40,0.06); }
      .header { padding:20px 28px; background:#0ea5a4; color:#fff; font-weight:700; }
      .body { padding:24px 28px; color:#111; line-height:1.45; }
      .footer { padding:16px 28px; font-size:13px; color:#6b7280; background:#fafafa; }
      .btn { display:inline-block; background:#0ea5a4; color:#fff; padding:10px 14px; border-radius:6px; text-decoration:none; font-weight:600; }
      .muted { color:#6b7280; font-size:13px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">SpiritLynk</div>
      <div class="body">
        ${bodyHtml}
      </div>
      <div class="footer">
        Sent by SpiritLynk · <span class="muted">asmglobal.cloud</span>
      </div>
    </div>
  </body>
  </html>`;
}

// -- Generic sendEmail
async function sendEmail({ to, subject, html, text }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_HOST) {
    console.warn("Email credentials missing in env — skipping sendEmail");
    return false;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
    text: text || textFallbackFromHtml(html || "")
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { ok: true, info };
  } catch (err) {
    console.error("Email send failed:", err && err.message ? err.message : err);
    return { ok: false, error: err };
  }
}

/* --------------------------
   PREBUILT TEMPLATES (HTML)
   -------------------------- */

// Welcome Email
async function sendWelcomeEmail(to, firstName) {
  const subject = `Welcome to SpiritLynk, ${firstName}`;
  const bodyHtml = `
    <h1>Hello ${firstName},</h1>
    <p>Welcome to <strong>SpiritLynk</strong> — we're excited to have you join our community.</p>
    <p>You can now access member resources, receive updates and connect with ministries.</p>
    <p><a class="btn" href="https://hub.spiritlynk.asmglobal.cloud/dashboard">Go to Dashboard</a></p>
    <p class="muted">If you did not sign up for this account, please ignore this email.</p>
  `;
  const html = wrapHtml(subject, bodyHtml);
  return await sendEmail({ to, subject, html });
}

// Daily Inspiration
async function sendDailyInspirationEmail(to, quote, author = "") {
  const subject = `Daily Inspiration from SpiritLynk`;
  const bodyHtml = `
    <h2>Daily Inspiration</h2>
    <blockquote style="font-style:italic; padding:12px 16px; border-left:4px solid #e6f7f7;">
      ${quote}${author ? `<div style="margin-top:8px; font-weight:600;">— ${author}</div>` : ""}
    </blockquote>
    <p>Have a blessed day!</p>
  `;
  const html = wrapHtml(subject, bodyHtml);
  return await sendEmail({ to, subject, html });
}

// Event Announcement
async function sendEventAnnouncementEmail(to, eventTitle, detailsHtml) {
  const subject = `Event: ${eventTitle} — SpiritLynk`;
  const bodyHtml = `
    <h2>${eventTitle}</h2>
    <div>${detailsHtml}</div>
    <p>We hope to see you there.</p>
  `;
  const html = wrapHtml(subject, bodyHtml);
  return await sendEmail({ to, subject, html });
}

// Service Reminder
async function sendServiceReminderEmail(to, serviceName, dateTime, location = "") {
  const subject = `Reminder: ${serviceName} on ${dateTime}`;
  const bodyHtml = `
    <h2>${serviceName}</h2>
    <p><strong>When:</strong> ${dateTime}</p>
    ${location ? `<p><strong>Where:</strong> ${location}</p>` : ""}
    <p>Please arrive on time. God bless!</p>
  `;
  const html = wrapHtml(subject, bodyHtml);
  return await sendEmail({ to, subject, html });
}

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendDailyInspirationEmail,
  sendEventAnnouncementEmail,
  sendServiceReminderEmail
};
