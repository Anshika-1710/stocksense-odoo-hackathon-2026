import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#f4f6f9", fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        width: 360, background: "#fff", borderRadius: 14,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)", padding: 32
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
          Reset Password
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
          Enter your email to receive an OTP
        </p>

        {sent ? (
          <div style={{
            background: "#ecfdf5", color: "#059669", padding: 12,
            borderRadius: 8, fontSize: 14, marginBottom: 16
          }}>
            OTP sent to {email}. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
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
              Send OTP
            </button>
          </form>
        )}

        <div style={{ marginTop: 16, fontSize: 13 }}>
          <Link to="/login" style={{ color: "#4f46e5", textDecoration: "none" }}>Back to login</Link>
        </div>
      </div>
    </div>
  );
}