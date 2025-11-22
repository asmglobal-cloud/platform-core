import React, { useState } from "react";
import Papa from "papaparse";
import api from "../../api"; // ✅ default import

export default function Upload() {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("CSV Parsed:", results.data);
        setCsvData(results.data);
      },
    });
  }

  async function handleSubmit() {
    try {
      console.log("📌 Uploading CSV:", csvData);

      const res = await api.post("/members/upload", csvData);
      console.log("✔ Upload response:", res.data);

      alert("Upload successful!");
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err);
      alert("Upload failed!");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Members CSV</h1>

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {fileName && (
        <p className="mt-2 text-gray-700">📄 Loaded: {fileName}</p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Upload Members
      </button>
    </div>
  );
}
