import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Receipts() {
  const [receipts] = useState([
    { ref: "REC-1042", supplier: "SteelCo Ltd", products: "Steel Rods x50", status: "Done" },
    { ref: "REC-1043", supplier: "Wood Supplies Inc", products: "Wooden Chairs x20", status: "Waiting" },
    { ref: "REC-1044", supplier: "Alum Traders", products: "Aluminum Sheets x100", status: "Draft" },
  ]);

  return (
    <Layout title="Vendor Receipts (Incoming Stock)">
      <div style={{
        background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 26, marginBottom: 20
      }}>
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
          {receipts.map((r, i) => (
            <tr key={i}>
              <td>{r.ref}</td>
              <td>{r.supplier}</td>
              <td>{r.products}</td>
              <td>
                <span style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: r.status === "Done" ? "#dcfce7" : r.status === "Waiting" ? "#fef3c7" : "#f1f5f9",
                  color: r.status === "Done" ? "#16a34a" : r.status === "Waiting" ? "#d97706" : "#64748b"
                }}>
                  {r.status}
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