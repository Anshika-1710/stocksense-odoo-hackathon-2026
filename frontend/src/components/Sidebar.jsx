import { NavLink } from "react-router-dom";
import {
  MdDashboard, MdInventory2, MdInput, MdOutput,
  MdSwapHoriz, MdTune, MdHistory, MdSettings, MdPerson
} from "react-icons/md";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/products", label: "Products", icon: <MdInventory2 /> },
  { to: "/receipts", label: "Receipts", icon: <MdInput /> },
  { to: "/deliveries", label: "Deliveries", icon: <MdOutput /> },
  { to: "/transfers", label: "Transfers", icon: <MdSwapHoriz /> },
  { to: "/adjustments", label: "Adjustments", icon: <MdTune /> },
  { to: "/move-history", label: "Move History", icon: <MdHistory /> },
  { to: "/settings", label: "Settings", icon: <MdSettings /> },
  { to: "/profile", label: "Profile", icon: <MdPerson /> },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ color: "white", padding: "10px 14px", marginBottom: 10 }}>StockSense</h2>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {l.icon} <span>{l.label}</span>
        </NavLink>
      ))}
    </div>
  );
}