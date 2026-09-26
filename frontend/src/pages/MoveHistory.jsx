import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function MoveHistory() {
  const [moves] = useState([
    { ref: "REC-1042", type: "Receipt", product: "Steel Rods", qty: 50, from: "Vendor", to: "Main Warehouse", status: "Done", by: "nmb" },
    { ref: "DO-2210", type: "Delivery", product: "Chairs", qty: -10, from: "Main Warehouse", to: "Customer A", status: "Done", by: "nmb" },
    { ref: "TR-301", type: "Transfer", product: "Steel Rods", qty: 20, from: "Main Warehouse", to: "Production Floor", status: "Done", by: "nmb" },
    { ref: "ADJ-501", type: "Adjustment", product: "Steel Rods", qty: -3, from: "—", to: "—", status: "Applied", by: "nmb" },
  ]);

  return (
    <Layout title="Move History">
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <select><option>All types</option></select>
        <select><option>All statuses</option></select>
      </div>
      <table>
        <thead>
          <tr><th>Reference</th><th>Type</th><th>Product</th><th>Qty</th><th>From</th><th>To</th><th>Status</th><th>By</th></tr>
        </thead>
        <tbody>
          {moves.map((m, i) => (
            <tr key={i}>
              <td>{m.ref}</td>
              <td>{m.type}</td>
              <td>{m.product}</td>
              <td style={{ color: m.qty < 0 ? "#ef4444" : "#16a34a", fontWeight: 600 }}>
                {m.qty > 0 ? `+${m.qty}` : m.qty}
              </td>
              <td>{m.from}</td>
              <td>{m.to}</td>
              <td>
                <span style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: "#dcfce7", color: "#16a34a"
                }}>
                  {m.status}
                </span>
              </td>
              <td>{m.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
