import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { MdLogout } from "react-icons/md";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/receipts", label: "Receipts" },
  { to: "/deliveries", label: "Deliveries" },
  { to: "/transfers", label: "Transfers" },
  { to: "/adjustments", label: "Adjustments" },
  { to: "/move-history", label: "Move History" },
  { to: "/settings", label: "Settings" },
  { to: "/profile", label: "Profile" },
];

export default function Layout({ title, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#1e293b", padding: "14px 24px", flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginRight: 8 }}>StockSense</span>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={{ color: "#cbd5e1", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "#fff", fontSize: 14 }}>Welcome, {user?.name || "User"}</span>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 6, background: "#ef4444",
            color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px",
            cursor: "pointer", fontSize: 14
          }}>
            <MdLogout /> Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "28px" }}>
        {title && <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: "#1e293b" }}>{title}</h1>}
        {children}
      </div>
    </div>
  );
}