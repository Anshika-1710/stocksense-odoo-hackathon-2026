import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function MoveHistory() {
  const [moves] = useState([]);

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
          {moves.length === 0 ? (
            <tr><td colSpan="8">No moves match these filters.</td></tr>
          ) : (
            moves.map((m, i) => (
              <tr key={i}>
                <td>{m.ref}</td><td>{m.type}</td><td>{m.product}</td><td>{m.qty}</td><td>{m.from}</td><td>{m.to}</td><td>{m.status}</td><td>{m.by}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}