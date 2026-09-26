import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, Truck, ArrowLeftRight,
  ClipboardList, History, Warehouse, User,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", end: true, icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/receipts", label: "Receipts", icon: Package },
  { to: "/deliveries", label: "Delivery orders", icon: Truck },
  { to: "/transfers", label: "Internal transfers", icon: ArrowLeftRight },
  { to: "/adjustments", label: "Stock adjustments", icon: ClipboardList },
  { to: "/history", label: "Move history", icon: History },
  { to: "/settings", label: "Warehouses", icon: Warehouse },
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-ink text-sage min-h-screen flex flex-col">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-lg font-semibold tracking-tight">📦 StockSense</p>
        <p className="text-xs text-sage/60 mt-0.5">Inventory, in real time</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "bg-moss text-white" : "text-sage/80 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {l.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-2 py-4 border-t border-white/10">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${isActive ? "bg-moss text-white" : "text-sage/80 hover:bg-white/5 hover:text-white"}`
          }
        >
          <User size={16} />
          My profile
        </NavLink>
      </div>
    </aside>
  );
}