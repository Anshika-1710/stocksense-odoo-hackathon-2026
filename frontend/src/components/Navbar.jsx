import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-8 py-4">
      <h1 className="text-xl font-semibold text-ink">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-slate hover:text-signal transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
