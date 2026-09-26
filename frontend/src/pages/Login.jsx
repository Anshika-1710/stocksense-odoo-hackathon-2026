import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: email.split("@")[0], email }, "dummy-token");
    navigate("/dashboard");
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#f4f6f9", fontFamily: "Inter, sans-serif"
    }}>
      <form onSubmit={handleSubmit} style={{
        width: 360, background: "#fff", borderRadius: 14,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)", padding: 32
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
          StockSense
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
          Log in to your inventory dashboard
        </p>

        <label style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%", padding: 10, marginTop: 6, marginBottom: 16,
            border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14
          }}
        />

        <label style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>Password</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%", padding: 10, marginTop: 6, marginBottom: 20,
            border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14
          }}
        />

        <button type="submit" style={{
          width: "100%", padding: 12, background: "#4f46e5", color: "#fff",
          border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer"
        }}>
          Log in
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 13 }}>
          <Link to="/signup" style={{ color: "#4f46e5", textDecoration: "none" }}>Create account</Link>
          <Link to="/forgot-password" style={{ color: "#4f46e5", textDecoration: "none" }}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}