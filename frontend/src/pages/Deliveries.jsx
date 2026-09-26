import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Deliveries() {
  const [deliveries] = useState([
    { ref: "DO-2210", customer: "Customer A", products: "Chairs x10", status: "Done" },
    { ref: "DO-2211", customer: "Customer B", products: "Desks x5", status: "Ready" },
    { ref: "DO-2212", customer: "Customer C", products: "Steel Rods x30", status: "Waiting" },
  ]);

  return (
    <Layout title="Delivery Orders (Outgoing Stock)">
      <div style={{
        background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 26, marginBottom: 20
      }}>
        <h2 style={{ marginBottom: 14 }}>Create New Delivery</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input type="text" placeholder="Customer Name" style={{ flex: 1, minWidth: 180 }} />
          <input type="text" placeholder="Product Name / SKU" style={{ flex: 1, minWidth: 180 }} />
          <input type="number" placeholder="Quantity" style={{ flex: 1, minWidth: 180 }} />
        </div>
        <button>Save & Mark as Draft</button>
      </div>

      <table>
        <thead>
          <tr><th>Reference</th><th>Customer</th><th>Products</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {deliveries.map((d, i) => (
            <tr key={i}>
              <td>{d.ref}</td>
              <td>{d.customer}</td>
              <td>{d.products}</td>
              <td>
                <span style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: d.status === "Done" ? "#dcfce7" : d.status === "Ready" ? "#dbeafe" : "#fef3c7",
                  color: d.status === "Done" ? "#16a34a" : d.status === "Ready" ? "#2563eb" : "#d97706"
                }}>
                  {d.status}
                </span>
              </td>
              <td><a href="#">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}