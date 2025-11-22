import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://spiritlynk.asmglobal.cloud/api/v1/members", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) {
    return <p className="text-center">Loading members...</p>;
  }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-[#3c3215]">Members Management</h1>

        <button
          onClick={() => navigate("/dashboard/members/new")}
          className="bg-[#c89b3c] hover:bg-[#b3872f] text-white text-sm px-4 py-2 rounded-lg shadow"
        >
          + Add Member
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-[#e5dfd2] rounded-xl shadow-sm">
          <thead className="bg-[#f8f3e4] text-[#3c3215] text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Member</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-[#4b4433]">
            {members.map((m, index) => (
              <tr key={index} className="border-t border-[#f0e9d7] hover:bg-[#faf6ef] transition">

                {/* AVATAR + NAME */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#c89b3c] flex items-center justify-center text-white text-xs font-bold">
                    {(m.firstName[0] || '') + (m.lastName ? m.lastName[0] : '')}
                  </div>

                  <span className="font-medium">
                    {m.firstName} {m.lastName}
                  </span>
                </td>

                <td className="text-center">{m.phone}</td>
                <td className="text-center">{m.email}</td>

                <td className="text-center">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    Active
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="py-3 px-4 text-right space-x-4">

                  {/* VIEW PROFILE */}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/dashboard/members/${m.id}`)}
                  >
                    View
                  </button>

                  {/* EDIT PAGE */}
                  <button
                    className="text-[#c89b3c] hover:underline"
                    onClick={() => navigate(`/dashboard/members/${m.id}/edit`)}
                  >
                    Edit
                  </button>

                  {/* DELETE PLACEHOLDER */}
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
