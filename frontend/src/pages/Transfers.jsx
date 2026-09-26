import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Transfers() {
  const [transfers] = useState([
    { ref: "TR-301", product: "Steel Rods", qty: 20, status: "Done", created: "Sep 24" },
    { ref: "TR-302", product: "Wooden Chairs", qty: 10, status: "In Progress", created: "Sep 25" },
    { ref: "TR-303", product: "Packaging Boxes", qty: 100, status: "Draft", created: "Sep 26" },
  ]);

  return (
    <Layout title="Internal Transfers">
      <button style={{ marginBottom: 16 }}>New internal transfers</button>
      <table>
        <thead>
          <tr><th>Reference</th><th>Product</th><th>Qty</th><th>Status</th><th>Created</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {transfers.map((t, i) => (
            <tr key={i}>
              <td>{t.ref}</td>
              <td>{t.product}</td>
              <td>{t.qty}</td>
              <td>
                <span style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: t.status === "Done" ? "#dcfce7" : t.status === "In Progress" ? "#dbeafe" : "#f1f5f9",
                  color: t.status === "Done" ? "#16a34a" : t.status === "In Progress" ? "#2563eb" : "#64748b"
                }}>
                  {t.status}
                </span>
              </td>
              <td>{t.created}</td>
              <td><a href="#">View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
