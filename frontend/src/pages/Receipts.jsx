import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Receipts() {
  const [receipts] = useState([]);

  return (
    <Layout title="Vendor Receipts (Incoming Stock)">
      <div className="card" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginBottom: 14 }}>Create New Receipt</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <input type="text" placeholder="Supplier Name" style={{ flex: 1, minWidth: 180 }} />
          <input type="text" placeholder="Product Name / SKU" style={{ flex: 1, minWidth: 180 }} />
          <input type="number" placeholder="Quantity Received" style={{ flex: 1, minWidth: 180 }} />
        </div>
        <button>Save & Mark as Draft</button>
      </div>

      <table>
        <thead>
          <tr><th>Reference</th><th>Supplier</th><th>Products</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {receipts.length === 0 ? (
            <tr><td colSpan="5">No receipts found. Create one above to track incoming vendor goods!</td></tr>
          ) : (
            receipts.map((r, i) => (
              <tr key={i}>
                <td>{r.ref}</td><td>{r.supplier}</td><td>{r.products}</td><td>{r.status}</td><td>{r.actions}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}