import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // ✅ default import

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api
      .get("/members") // This becomes https://spiritlynk.asmglobal.cloud/api/v1/members
      .then((res) => {
        console.log("📌 Members fetched:", res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch members:", err.response?.data || err);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>

        <div className="flex gap-3">
          {/* Upload CSV */}
          <Link
            to="/dashboard/members/upload"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Upload CSV
          </Link>

          {/* Add Member */}
          <Link
            to="/dashboard/members/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Member
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{m.firstName} {m.lastName}</td>
                <td>{m.email || "—"}</td>
                <td>{m.phone}</td>
                <td>
                  <Link
                    to={`/dashboard/members/${m.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {members.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No members found.
          </p>
        )}
      </div>
    </div>
  );
}
