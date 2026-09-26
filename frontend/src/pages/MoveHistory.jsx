import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";

export default function MoveHistory() {
  const [moves, setMoves] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });

  useEffect(() => {
    api.get("/stock/moves", { params: filters }).then((res) => setMoves(res.data));
  }, [filters]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Move history" />
        <main className="p-8 space-y-6">
          <div className="flex gap-3">
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="rounded-md border border-black/10 px-3 py-2 text-sm">
              <option value="">All types</option>
              <option value="receipt">Receipts</option>
              <option value="delivery">Deliveries</option>
              <option value="internal">Internal transfers</option>
              <option value="adjustment">Adjustments</option>
            </select>
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="rounded-md border border-black/10 px-3 py-2 text-sm">
              <option value="">All statuses</option>
              <option value="draft">Draft</option>
              <option value="waiting">Waiting</option>
              <option value="ready">Ready</option>
              <option value="done">Done</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate/70 border-b border-black/5">
                <tr>
                  <th className="px-5 py-3 font-medium">Reference</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Qty</th>
                  <th className="px-5 py-3 font-medium">From</th>
                  <th className="px-5 py-3 font-medium">To</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">By</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((m) => (
                  <tr key={m._id} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-3 font-medium">{m.reference}</td>
                    <td className="px-5 py-3 capitalize text-slate">{m.type}</td>
                    <td className="px-5 py-3">{m.product?.name}</td>
                    <td className="px-5 py-3">{m.quantity}</td>
                    <td className="px-5 py-3 text-slate">{m.fromLocation?.name || "—"}</td>
                    <td className="px-5 py-3 text-slate">{m.toLocation?.name || "—"}</td>
                    <td className="px-5 py-3">{m.status}</td>
                    <td className="px-5 py-3 text-slate">{m.createdBy?.name}</td>
                  </tr>
                ))}
                {moves.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-6 text-slate text-center">No moves match these filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
