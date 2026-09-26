import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Adjustments() {
  const [adjustments] = useState([
    { ref: "ADJ-501", product: "Steel Rods", delta: "-3", notes: "Damaged in storage", status: "Applied" },
    { ref: "ADJ-502", product: "Wooden Chairs", delta: "+2", notes: "Recount correction", status: "Applied" },
    { ref: "ADJ-503", product: "Aluminum Sheets", delta: "-5", notes: "Physical count mismatch", status: "Pending" },
  ]);

  return (
    <Layout title="Stock Adjustments">
      <button style={{ marginBottom: 16 }}>New adjustment</button>
      <table>
        <thead>
          <tr><th>Reference</th><th>Product</th><th>Delta</th><th>Notes</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {adjustments.map((a, i) => (
            <tr key={i}>
              <td>{a.ref}</td>
              <td>{a.product}</td>
              <td style={{ color: a.delta.startsWith("-") ? "#ef4444" : "#16a34a", fontWeight: 600 }}>
                {a.delta}
              </td>
              <td>{a.notes}</td>
              <td>
                <span style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                  background: a.status === "Applied" ? "#dcfce7" : "#fef3c7",
                  color: a.status === "Applied" ? "#16a34a" : "#d97706"
                }}>
                  {a.status}
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
