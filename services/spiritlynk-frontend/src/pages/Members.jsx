import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const navigate = useNavigate();

  // Temporary Sample Data (Replace with API later)
  const [members] = useState([
    { name: "Solomon Akonnor", email: "solomon@example.com", phone: "0541234567", role: "Pastor", status: "Active", avatar: null },
    { name: "Mary Johnson", email: "mary@example.com", phone: "0249876543", role: "Member", status: "Active", avatar: null },
    { name: "Daniel Owusu", email: "daniel@example.com", phone: "0201112222", role: "Worker", status: "Pending", avatar: null },
  ]);

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

      {/* SEARCH BAR */}
      <div className="mb-6 flex justify-between gap-4">
        <input
          type="text"
          placeholder="Search members..."
          className="flex-1 border border-[#d9d1be] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#c89b3c]"
        />

        <button className="px-4 py-2 text-sm border border-[#d9d1be] rounded-lg hover:bg-[#f3e9d7]">
          Filter
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
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-[#4b4433]">
            {members.map((m, index) => (
              <tr key={index} className="border-t border-[#f0e9d7] hover:bg-[#faf6ef] transition">
                
                {/* NAME + AVATAR */}
                <td className="py-3 px-4 flex items-center gap-3">
                  {m.avatar ? (
                    <img src={m.avatar} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#c89b3c] flex items-center justify-center text-white text-xs font-bold">
                      {m.name.split(" ").map(x => x[0]).join("")}
                    </div>
                  )}
                  <span className="font-medium">{m.name}</span>
                </td>

                <td className="text-center">{m.phone}</td>
                <td className="text-center">{m.email}</td>
                <td className="text-center">{m.role}</td>
                <td className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    m.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {m.status}
                  </span>
                </td>

                {/* ACTION BUTTONS */}
                <td className="py-3 px-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline" onClick={() => navigate(`/dashboard/members/${index}`)}>
                    View
                  </button>
                  <button className="text-[#c89b3c] hover:underline">
                    Edit
                  </button>
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
