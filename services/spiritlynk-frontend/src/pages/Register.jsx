import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { registerUser } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser(name, email, password);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-4">Register</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          className="border p-3 rounded"
          placeholder="Full Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-3 rounded"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white p-3 rounded">
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}
