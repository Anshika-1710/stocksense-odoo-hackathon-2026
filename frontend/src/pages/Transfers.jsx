import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Transfers() {
  const [transfers] = useState([]);

  return (
    <Layout title="Internal Transfers">
      <button style={{ marginBottom: 16 }}>New internal transfers</button>
      <table>
        <thead>
          <tr><th>Reference</th><th>Product</th><th>Qty</th><th>Status</th><th>Created</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {transfers.length === 0 ? (
            <tr><td colSpan="6">No internal transfers yet.</td></tr>
          ) : (
            transfers.map((t, i) => (
              <tr key={i}>
                <td>{t.ref}</td><td>{t.product}</td><td>{t.qty}</td><td>{t.status}</td><td>{t.created}</td><td>{t.actions}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}