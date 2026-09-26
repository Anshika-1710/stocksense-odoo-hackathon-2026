import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Adjustments() {
  const [adjustments] = useState([]);

  return (
    <Layout title="Stock Adjustments">
      <button style={{ marginBottom: 16 }}>New adjustment</button>
      <table>
        <thead>
          <tr><th>Reference</th><th>Product</th><th>Delta</th><th>Notes</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {adjustments.length === 0 ? (
            <tr><td colSpan="6">No adjustments logged yet.</td></tr>
          ) : (
            adjustments.map((a, i) => (
              <tr key={i}>
                <td>{a.ref}</td><td>{a.product}</td><td>{a.delta}</td><td>{a.notes}</td><td>{a.status}</td><td>{a.actions}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}