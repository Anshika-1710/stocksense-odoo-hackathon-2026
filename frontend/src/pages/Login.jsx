import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage px-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-black/5 p-8">
        <p className="text-lg font-semibold text-ink">StockSense</p>
        <p className="text-sm text-slate mt-1 mb-6">Log in to your inventory dashboard</p>

        <form onSubmit={submit} className="space-y-4">
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
          </div>
          {error && <p className="text-sm text-signal">{error}</p>}
          <button
            disabled={busy}
            className="w-full rounded-md bg-ink text-white py-2 text-sm font-medium hover:bg-slate transition-colors disabled:opacity-60"
          >
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/signup" className="text-moss hover:underline">Create account</Link>
          <Link to="/forgot-password" className="text-slate hover:underline">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
