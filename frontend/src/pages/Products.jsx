import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", category: "", uom: "unit", reorderMin: 0, reorderMax: 0 });
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await api.get("/products", { params: { search } });
    setProducts(data);
  };

  useEffect(() => {
    load();
    api.get("/products/categories/all").then((res) => setCategories(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/products", form);
      setForm({ name: "", sku: "", category: "", uom: "unit", reorderMin: 0, reorderMax: 0 });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create product");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Products" />
        <main className="p-8 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <input
              placeholder="Search by name or SKU"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
            <button
              onClick={() => setShowForm((s) => !s)}
              className="rounded-md bg-ink text-white px-4 py-2 text-sm font-medium hover:bg-slate transition-colors"
            >
              {showForm ? "Cancel" : "New product"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={submit} className="bg-white rounded-lg border border-black/5 p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
              <input required placeholder="Product name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input required placeholder="SKU" value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <select required value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <input placeholder="Unit of measure" value={form.uom}
                onChange={(e) => setForm({ ...form, uom: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input type="number" placeholder="Reorder min" value={form.reorderMin}
                onChange={(e) => setForm({ ...form, reorderMin: Number(e.target.value) })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input type="number" placeholder="Reorder max" value={form.reorderMax}
                onChange={(e) => setForm({ ...form, reorderMax: Number(e.target.value) })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm" />
              {error && <p className="col-span-full text-sm text-signal">{error}</p>}
              <button className="col-span-full rounded-md bg-moss text-white py-2 text-sm font-medium hover:opacity-90">
                Save product
              </button>
            </form>
          )}

          <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate/70 border-b border-black/5">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">SKU</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">UoM</th>
                  <th className="px-5 py-3 font-medium">Total stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3">{p.name}</td>
                    <td className="px-5 py-3 text-slate">{p.sku}</td>
                    <td className="px-5 py-3 text-slate">{p.category?.name}</td>
                    <td className="px-5 py-3 text-slate">{p.uom}</td>
                    <td className="px-5 py-3 font-medium">{p.totalStock}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-6 text-slate text-center">No products yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
