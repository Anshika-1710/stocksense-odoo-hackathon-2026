import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/products", label: "Products" },
  { to: "/receipts", label: "Receipts" },
  { to: "/deliveries", label: "Delivery orders" },
  { to: "/transfers", label: "Internal transfers" },
  { to: "/adjustments", label: "Stock adjustments" },
  { to: "/history", label: "Move history" },
  { to: "/settings", label: "Warehouses" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-ink text-sage min-h-screen flex flex-col">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-lg font-semibold tracking-tight">StockSense</p>
        <p className="text-xs text-sage/60 mt-0.5">Inventory, in real time</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-moss text-white" : "text-sage/80 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-white/10">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 text-sm ${isActive ? "bg-moss text-white" : "text-sage/80 hover:bg-white/5 hover:text-white"}`
          }
        >
          My profile
        </NavLink>
      </div>
    </aside>
  );
}
