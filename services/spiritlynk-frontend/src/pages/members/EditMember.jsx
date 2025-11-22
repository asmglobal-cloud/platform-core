import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TABS = [
  { id: "personal", label: "Personal Information" },
  { id: "church", label: "Church Membership" },
  { id: "security", label: "Roles & Access" },
];

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load member details
  useEffect(() => {
    async function fetchMember() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://spiritlynk.asmglobal.cloud/api/v1/members/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setMember(data);
      } catch (err) {
        console.error("Failed to load member:", err);
        setError("Failed to load member details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  function updateField(field, value) {
    setMember((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!member) return;

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://spiritlynk.asmglobal.cloud/api/v1/members/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(member),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Save failed:", body);
        setError(body.error || "Failed to save changes.");
      } else {
        alert("Member updated successfully.");
        navigate(`/dashboard/members/${id}`);
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Unexpected error while saving.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading member...</p>;
  if (!member) return <p>Member not found.</p>;

  const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
  const initials =
    (member.firstName?.[0] || "") + (member.lastName?.[0] || "");

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-[#c89b3c] text-white flex items-center justify-center text-lg font-bold">
          {initials}
        </div>

        <div>
          <h1 className="text-xl font-bold text-[#3c3215]">
            Edit Member: {fullName || "Unnamed"}
          </h1>
          <p className="text-xs text-gray-500">
            Update personal details, church membership and role.
          </p>
        </div>

        <div className="ml-auto flex gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-lg border border-[#e5dfd2]"
            onClick={() => navigate(`/dashboard/members/${id}`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 text-sm rounded-lg bg-[#c89b3c] text-white hover:bg-[#b3872f]"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-[#e5dfd2] flex gap-4 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              "pb-2 -mb-px border-b-2 transition " +
              (activeTab === tab.id
                ? "border-[#c89b3c] text-[#3c3215] font-semibold"
                : "border-transparent text-[#8b816e] hover:text-[#3c3215]")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* TAB PANELS */}
      {activeTab === "personal" && (
        <section className="bg-white p-6 rounded-xl border border-[#e5dfd2] shadow space-y-4">
          <h2 className="text-sm font-semibold text-[#3c3215] mb-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="First Name"
              value={member.firstName || ""}
              onChange={(e) => updateField("firstName", e.target.value)}
            />

            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="Last Name"
              value={member.lastName || ""}
              onChange={(e) => updateField("lastName", e.target.value)}
            />

            <input
              type="email"
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="Email"
              value={member.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
            />

            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="Phone"
              value={member.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
            />

            <select
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              value={member.gender || ""}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="date"
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              value={member.dateOfBirth || ""}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
            />

            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2 col-span-2"
              placeholder="Address"
              value={member.address || ""}
              onChange={(e) => updateField("address", e.target.value)}
            />

            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="Marital Status"
              value={member.maritalStatus || ""}
              onChange={(e) => updateField("maritalStatus", e.target.value)}
            />

            <input
              className="border border-[#e5dfd2] rounded-lg px-3 py-2"
              placeholder="Occupation"
              value={member.occupation || ""}
              onChange={(e) => updateField("occupation", e.target.value)}
            />
          </div>
        </section>
      )}

      {activeTab === "church" && (
        <section className="bg-white p-6 rounded-xl border border-[#e5dfd2] shadow space-y-4">
          <h2 className="text-sm font-semibold text-[#3c3215] mb-2">
            Church Membership
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block mb-1 text-xs text-[#8b816e]">
                Joined Date
              </label>
              <input
                type="date"
                className="border border-[#e5dfd2] rounded-lg px-3 py-2 w-full"
                value={member.joinedDate || ""}
                onChange={(e) => updateField("joinedDate", e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#8b816e]">
                Baptized
              </label>
              <select
                className="border border-[#e5dfd2] rounded-lg px-3 py-2 w-full"
                value={member.isBaptized ? "yes" : "no"}
                onChange={(e) =>
                  updateField("isBaptized", e.target.value === "yes")
                }
              >
                <option value="no">Not Baptized</option>
                <option value="yes">Baptized</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#8b816e]">
                Worker
              </label>
              <select
                className="border border-[#e5dfd2] rounded-lg px-3 py-2 w-full"
                value={member.isWorker ? "yes" : "no"}
                onChange={(e) =>
                  updateField("isWorker", e.target.value === "yes")
                }
              >
                <option value="no">Not a Worker</option>
                <option value="yes">Worker</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#8b816e]">
                Department / Ministry
              </label>
              <input
                className="border border-[#e5dfd2] rounded-lg px-3 py-2 w-full"
                placeholder="E.g. Ushering, Choir"
                value={member.department || ""}
                onChange={(e) => updateField("department", e.target.value)}
              />
            </div>
          </div>
        </section>
      )}

      {activeTab === "security" && (
        <section className="bg-white p-6 rounded-xl border border-[#e5dfd2] shadow space-y-4">
          <h2 className="text-sm font-semibold text-[#3c3215] mb-2">
            Roles & Access
          </h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block mb-1 text-xs text-[#8b816e]">
                Role
              </label>
              <select
                className="border border-[#e5dfd2] rounded-lg px-3 py-2 w-full"
                value={member.role || "member"}
                onChange={(e) => updateField("role", e.target.value)}
              >
                <option value="member">Member</option>
                <option value="pastor">Pastor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <p className="text-xs text-[#8b816e]">
                More access controls (permissions, linked accounts, audit logs)
                will be added here later.
              </p>
            </div>
          </div>
        </section>
      )}
    </form>
  );
}
