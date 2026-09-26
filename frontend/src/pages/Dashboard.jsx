import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import KpiCard from "../components/KpiCard.jsx";
import api from "../api/axios.js";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    api.get("/dashboard/kpis").then((res) => setKpis(res.data));
    api.get("/dashboard/low-stock").then((res) => setLowStock(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Dashboard" />
        <main className="p-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <KpiCard label="Total products" value={kpis?.totalProducts ?? "–"} />
            <KpiCard label="Low stock items" value={kpis?.lowStockItems ?? "–"} tone="alert" />
            <KpiCard label="Out of stock" value={kpis?.outOfStockItems ?? "–"} tone="alert" />
            <KpiCard label="Pending receipts" value={kpis?.pendingReceipts ?? "–"} />
            <KpiCard label="Pending deliveries" value={kpis?.pendingDeliveries ?? "–"} />
          </div>

          <div className="bg-white rounded-lg border border-black/5">
            <div className="px-5 py-4 border-b border-black/5">
              <p className="font-medium text-ink">Items needing reorder</p>
            </div>
            {lowStock.length === 0 ? (
              <p className="px-5 py-6 text-sm text-slate">Nothing below its reorder point right now.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-slate/70 border-b border-black/5">
                  <tr>
                    <th className="px-5 py-2 font-medium">Product</th>
                    <th className="px-5 py-2 font-medium">SKU</th>
                    <th className="px-5 py-2 font-medium">Quantity</th>
                    <th className="px-5 py-2 font-medium">Reorder point</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((row) => (
                    <tr key={row.product._id} className="border-b border-black/5 last:border-0">
                      <td className="px-5 py-2">{row.product.name}</td>
                      <td className="px-5 py-2 text-slate">{row.product.sku}</td>
                      <td className="px-5 py-2 text-signal font-medium">{row.quantity}</td>
                      <td className="px-5 py-2 text-slate">{row.product.reorderMin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
