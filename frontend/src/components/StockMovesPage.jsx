import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import api from "../api/axios.js";

const statusStyles = {
  draft: "bg-slate/10 text-slate",
  waiting: "bg-signal/10 text-signal",
  ready: "bg-moss/10 text-moss",
  done: "bg-moss text-white",
  cancelled: "bg-black/5 text-slate/50 line-through",
};

// Shared page for receipts, deliveries and internal transfers — the three move
// types that share the same "product + quantity + location(s)" shape.
export default function StockMovesPage({ type, title, endpoint, needsFrom, needsTo }) {
  const [moves, setMoves] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    product: "", quantity: "", warehouse: "", fromLocation: "", toLocation: "", partner: "", notes: "",
  });

  const load = async () => {
    const { data } = await api.get("/stock/moves", { params: { type } });
    setMoves(data);
  };

  useEffect(() => {
    load();
    api.get("/products").then((res) => setProducts(res.data));
    api.get("/warehouses").then((res) => setWarehouses(res.data));
    api.get("/warehouses/locations/all").then((res) => setLocations(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post(endpoint, form);
      setForm({ product: "", quantity: "", warehouse: "", fromLocation: "", toLocation: "", partner: "", notes: "" });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create move");
    }
  };

  const validate = async (id) => {
    await api.patch(`/stock/moves/${id}/validate`);
    load();
  };

  const cancel = async (id) => {
    await api.patch(`/stock/moves/${id}/cancel`);
    load();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title={title} />
        <main className="p-8 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm((s) => !s)}
              className="rounded-md bg-ink text-white px-4 py-2 text-sm font-medium hover:bg-slate transition-colors"
            >
              {showForm ? "Cancel" : `New ${title.toLowerCase()}`}
            </button>
          </div>

          {showForm && (
            <form onSubmit={submit} className="bg-white rounded-lg border border-black/5 p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
              <select required value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Product</option>
                {products.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>)}
              </select>
              <input required type="number" min="1" placeholder="Quantity" value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <select required value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Warehouse</option>
                {warehouses.map((w) => <option key={w._id} value={w._id}>{w.name}</option>)}
              </select>
              {needsFrom && (
                <select required value={form.fromLocation} onChange={(e) => setForm({ ...form, fromLocation: e.target.value })}
                  className="rounded-md border border-black/10 px-3 py-2 text-sm">
                  <option value="">From location</option>
                  {locations.map((l) => <option key={l._id} value={l._id}>{l.name}</option>)}
                </select>
              )}
              {needsTo && (
                <select required value={form.toLocation} onChange={(e) => setForm({ ...form, toLocation: e.target.value })}
                  className="rounded-md border border-black/10 px-3 py-2 text-sm">
                  <option value="">To location</option>
                  {locations.map((l) => <option key={l._id} value={l._id}>{l.name}</option>)}
                </select>
              )}
              <input placeholder="Supplier / customer (optional)" value={form.partner}
                onChange={(e) => setForm({ ...form, partner: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input placeholder="Notes (optional)" value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              {error && <p className="col-span-full text-sm text-signal">{error}</p>}
              <button className="col-span-full rounded-md bg-moss text-white py-2 text-sm font-medium hover:opacity-90">
                Create draft
              </button>
            </form>
          )}

          <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate/70 border-b border-black/5">
                <tr>
                  <th className="px-5 py-3 font-medium">Reference</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((m) => (
                  <tr key={m._id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3 font-medium">{m.reference}</td>
                    <td className="px-5 py-3">{m.product?.name}</td>
                    <td className="px-5 py-3">{m.quantity} {m.product?.uom}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[m.status]}`}>{m.status}</span>
                    </td>
                    <td className="px-5 py-3 text-slate">{new Date(m.createdAt).toLocaleString()}</td>
                    <td className="px-5 py-3 space-x-3">
                      {m.status !== "done" && m.status !== "cancelled" && (
                        <>
                          <button onClick={() => validate(m._id)} className="text-moss hover:underline">Validate</button>
                          <button onClick={() => cancel(m._id)} className="text-slate hover:underline">Cancel</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {moves.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-6 text-slate text-center">No {title.toLowerCase()} yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
