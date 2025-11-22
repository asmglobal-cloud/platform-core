import { useState } from "react";
import api from "../api";

export default function SMS() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function sendSMS(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await api.post("/sms/send", {
        phone,
        message,
      });

      setStatus("✔ SMS sent successfully!");
      console.log("SMS Result:", res.data);

      setPhone("");
      setMessage("");

    } catch (err) {
      console.error(err);
      setStatus("❌ SMS sending failed");
    }

    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Send SMS Message</h1>

      <form onSubmit={sendSMS} className="space-y-4 bg-white p-6 rounded-lg shadow w-full max-w-lg">

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="+233557301095"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>

        {status && <p className="mt-3 font-semibold">{status}</p>}
      </form>
    </div>
  );
}
