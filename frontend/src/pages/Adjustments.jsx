import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";

export default function Adjustments() {
  const [moves, setMoves] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ product: "", location: "", warehouse: "", countedQuantity: "", notes: "" });

  const load = async () => {
    const { data } = await api.get("/stock/moves", { params: { type: "adjustment" } });
    setMoves(data);
  };

  useEffect(() => {
    load();
    api.get("/products").then((res) => setProducts(res.data));
    api.get("/warehouses").then((res) => setWarehouses(res.data));
    api.get("/warehouses/locations/all").then((res) => setLocations(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/stock/adjustments", form);
      setForm({ product: "", location: "", warehouse: "", countedQuantity: "", notes: "" });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create adjustment");
    }
  };

  const validate = async (id) => {
    await api.patch(`/stock/moves/${id}/validate`);
    load();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Stock adjustments" />
        <main className="p-8 space-y-6">
          <div className="flex justify-end">
            <button onClick={() => setShowForm((s) => !s)}
              className="rounded-md bg-ink text-white px-4 py-2 text-sm font-medium hover:bg-slate transition-colors">
              {showForm ? "Cancel" : "New adjustment"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={submit} className="bg-white rounded-lg border border-black/5 p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
              <select required value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Product</option>
                {products.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>)}
              </select>
              <select required value={form.warehouse} onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Warehouse</option>
                {warehouses.map((w) => <option key={w._id} value={w._id}>{w.name}</option>)}
              </select>
              <select required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Location</option>
                {locations.map((l) => <option key={l._id} value={l._id}>{l.name}</option>)}
              </select>
              <input required type="number" min="0" placeholder="Counted quantity" value={form.countedQuantity}
                onChange={(e) => setForm({ ...form, countedQuantity: Number(e.target.value) })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input placeholder="Notes (optional)" value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm col-span-2" />
              {error && <p className="col-span-full text-sm text-signal">{error}</p>}
              <button className="col-span-full rounded-md bg-moss text-white py-2 text-sm font-medium hover:opacity-90">
                Log adjustment
              </button>
            </form>
          )}

          <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate/70 border-b border-black/5">
                <tr>
                  <th className="px-5 py-3 font-medium">Reference</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Delta</th>
                  <th className="px-5 py-3 font-medium">Notes</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((m) => (
                  <tr key={m._id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3 font-medium">{m.reference}</td>
                    <td className="px-5 py-3">{m.product?.name}</td>
                    <td className="px-5 py-3">{m.toLocation ? "+" : "-"}{m.quantity}</td>
                    <td className="px-5 py-3 text-slate">{m.notes}</td>
                    <td className="px-5 py-3">{m.status}</td>
                    <td className="px-5 py-3">
                      {m.status !== "done" && (
                        <button onClick={() => validate(m._id)} className="text-moss hover:underline">Validate</button>
                      )}
                    </td>
                  </tr>
                ))}
                {moves.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-6 text-slate text-center">No adjustments logged yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
