import { MdInventory2, MdWarning, MdInput, MdOutput, MdSwapHoriz, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

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

const kpis = [
  { icon: <MdInventory2 />, label: "Total Products in Stock", value: "1,240", color: "#4f46e5" },
  { icon: <MdWarning />, label: "Low / Out of Stock", value: "8", color: "#f59e0b" },
  { icon: <MdInput />, label: "Pending Receipts", value: "5", color: "#0ea5e9" },
  { icon: <MdOutput />, label: "Pending Deliveries", value: "12", color: "#10b981" },
  { icon: <MdSwapHoriz />, label: "Transfers Scheduled", value: "3", color: "#8b5cf6" },
];

const activity = [
  "Receipt #REC-1042 marked as Done — 50 units Steel Rods",
  "Delivery #DO-2210 shipped — 10 Chairs to Customer A",
  "Internal transfer completed — Main Warehouse → Production Floor",
  "Stock adjustment logged — Steel Rods -3 kg (damaged)",
];

export default function Dashboard() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginRight: 10 }}>StockSense</span>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={{
              color: "#cbd5e1", textDecoration: "none", fontSize: 14, fontWeight: 500
            }}>
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
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20, color: "#1e293b" }}>
          Inventory Dashboard
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16
        }}>
          {kpis.map((k) => (
            <div key={k.label} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 22
            }}>
              <div style={{
                width: 48, height: 48, display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: 10,
                background: `${k.color}1A`, color: k.color, fontSize: 24
              }}>
                {k.icon}
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1e293b" }}>{k.value}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{k.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#1e293b" }}>
            Recent Activity
          </h2>
          <div style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 20
          }}>
            {activity.map((item, i) => (
              <div key={i} style={{
                padding: "12px 0",
                borderBottom: i < activity.length - 1 ? "1px solid #e2e8f0" : "none",
                fontSize: 14, color: "#334155"
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14, color: "#1e293b" }}>
            Quick Links
          </h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { to: "/receipts", label: "New Receipt" },
              { to: "/deliveries", label: "New Delivery" },
              { to: "/transfers", label: "New Transfer" },
              { to: "/adjustments", label: "New Adjustment" },
            ].map((q) => (
              <Link key={q.to} to={q.to} style={{
                background: "#4f46e5", color: "#fff", padding: "10px 18px",
                borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none"
              }}>
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}