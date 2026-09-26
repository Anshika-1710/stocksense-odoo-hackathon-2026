import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Deliveries() {
  const [deliveries] = useState([]);

  return (
    <Layout title="Delivery Orders (Outgoing Stock)">
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 20, marginBottom: 20 }}>
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
          {deliveries.length === 0 ? (
            <tr><td colSpan="5">No deliveries found. Create one above to track outgoing shipments!</td></tr>
          ) : (
            deliveries.map((d, i) => (
              <tr key={i}>
                <td>{d.ref}</td><td>{d.customer}</td><td>{d.products}</td><td>{d.status}</td><td>{d.actions}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}