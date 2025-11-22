import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

export default function MemberForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // LOAD DATA IF EDIT MODE
  useEffect(() => {
    if (!isEdit) return;

    async function fetchMember() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone
      });
    }

    fetchMember();
  }, [isEdit, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${API_BASE_URL}/members/${id}`
      : `${API_BASE_URL}/members`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    console.log("Saved:", result);

    navigate("/dashboard/members");
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">
        {isEdit ? "Edit Member" : "Add New Member"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-3 w-full rounded"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          type="submit"
          className="bg-[#c89b3c] text-white px-6 py-2 rounded shadow"
        >
          {isEdit ? "Save Changes" : "Create Member"}
        </button>
      </form>
    </div>
  );
}
