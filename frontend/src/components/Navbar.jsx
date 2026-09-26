import { useAuth } from "../context/AuthContext.jsx";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 20px", background: "#fff", boxShadow: "var(--shadow)"
    }}>
      <div style={{ fontWeight: 600 }}>Welcome{user?.name ? `, ${user.name}` : ""}</div>
      <button onClick={logout} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", cursor: "pointer", color: "var(--danger)"
      }}>
        <MdLogout /> Logout
      </button>
    </div>
  );
}