import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://spiritlynk.asmglobal.cloud/api/v1/members/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setMember(data);
      } catch (error) {
        console.error("Error loading member:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this member?")) return;

    const token = localStorage.getItem("token");

    await fetch(`https://spiritlynk.asmglobal.cloud/api/v1/members/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Member deleted.");
    navigate("/dashboard/members");
  }

  if (loading) return <p>Loading profile...</p>;
  if (!member) return <p>Member not found.</p>;

  const fullName = `${member.firstName} ${member.lastName}`;
  const initials = `${member.firstName?.[0] || ""}${member.lastName?.[0] || ""}`;

  return (
    <div className="space-y-10">

      {/* ─────────── HEADER ─────────── */}
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-[#c89b3c] flex items-center justify-center text-white text-2xl font-bold shadow">
          {initials}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#3c3215]">{fullName}</h1>

          <p className="text-sm text-gray-600">
            {member.role || "Member"} • {member.isBaptized ? "Baptized" : "Not Baptized"} • Active
          </p>
        </div>

        <div className="ml-auto flex gap-3">
          <button
            onClick={() => navigate(`/dashboard/members/${id}/edit`)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Edit Member
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
          >
            Delete Member
          </button>
        </div>
      </div>

      {/* ─────────── PERSONAL INFO ─────────── */}
      <section className="bg-white p-8 rounded-xl border border-[#e5dfd2] shadow">
        <h2 className="text-lg font-bold mb-6 text-[#3c3215]">Personal Information</h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <p><strong>Full Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>Gender:</strong> {member.gender}</p>
          <p><strong>Date of Birth:</strong> {member.dateOfBirth || "Not set"}</p>
          <p><strong>Address:</strong> {member.address || "Not set"}</p>
          <p><strong>Marital Status:</strong> {member.maritalStatus || "Not set"}</p>
          <p><strong>Occupation:</strong> {member.occupation || "Not set"}</p>
        </div>
      </section>

      {/* ─────────── CHURCH MEMBERSHIP ─────────── */}
      <section className="bg-white p-8 rounded-xl border border-[#e5dfd2] shadow">
        <h2 className="text-lg font-bold mb-6 text-[#3c3215]">Church Membership</h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <p><strong>Joined:</strong> {member.joinedDate || "Not set"}</p>
          <p><strong>Baptized:</strong> {member.isBaptized ? "Yes" : "No"}</p>
          <p><strong>Worker:</strong> {member.isWorker ? "Yes" : "No"}</p>
          <p><strong>Assigned Ministry:</strong> {"Coming soon"}</p>
          <p><strong>Roles & Permissions:</strong> {member.role || "Member"}</p>
        </div>
      </section>

      {/* ─────────── FUTURE TABS ─────────── */}
      <section className="bg-white p-8 rounded-xl border border-[#e5dfd2] shadow opacity-60">
        <h2 className="text-lg font-bold mb-6 text-[#3c3215]">Activity & Records</h2>

        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Attendance History (Coming)</li>
          <li>Giving & Contributions (Coming)</li>
          <li>Discipleship Progress (Coming)</li>
          <li>Follow-up Notes (Coming)</li>
        </ul>
      </section>

    </div>
  );
}
