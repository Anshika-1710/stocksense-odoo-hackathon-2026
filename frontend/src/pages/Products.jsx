import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Products() {
  const [search, setSearch] = useState("");
  const [products] = useState([
    { name: "Steel Rods", sku: "STL-001", category: "Raw Material", uom: "kg", stock: 420 },
    { name: "Wooden Chairs", sku: "CHR-014", category: "Furniture", uom: "pcs", stock: 85 },
    { name: "Packaging Boxes", sku: "PKG-007", category: "Packaging", uom: "pcs", stock: 1200 },
    { name: "Aluminum Sheets", sku: "ALM-022", category: "Raw Material", uom: "kg", stock: 15 },
    { name: "Office Desks", sku: "DSK-009", category: "Furniture", uom: "pcs", stock: 32 },
  ]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Products">
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <button>New product</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>SKU</th><th>Category</th><th>UOM</th><th>Total Stock</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
              No products match your search.
            </td></tr>
          ) : (
            filtered.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.category}</td>
                <td>{p.uom}</td>
                <td style={{
                  color: p.stock < 20 ? "#ef4444" : "#334155",
                  fontWeight: p.stock < 20 ? 600 : 400
                }}>
                  {p.stock} {p.stock < 20 && "⚠️"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}