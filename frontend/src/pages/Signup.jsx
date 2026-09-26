import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage px-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-black/5 p-8">
        <p className="text-lg font-semibold text-ink">StockSense</p>
        <p className="text-sm text-slate mt-1 mb-6">Create your account</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-slate">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
          </div>
          <div>
            <label className="text-sm text-slate">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
          </div>
          <div>
            <label className="text-sm text-slate">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
          </div>
          <div>
            <label className="text-sm text-slate">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            >
              <option value="staff">Warehouse staff</option>
              <option value="manager">Inventory manager</option>
            </select>
          </div>
          {error && <p className="text-sm text-signal">{error}</p>}
          <button
            disabled={busy}
            className="w-full rounded-md bg-ink text-white py-2 text-sm font-medium hover:bg-slate transition-colors disabled:opacity-60"
          >
            {busy ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate">
          Already have an account? <Link to="/login" className="text-moss hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
