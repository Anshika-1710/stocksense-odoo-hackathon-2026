import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Products() {
  const [products] = useState([]);

  return (
    <Layout title="Products">
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input type="text" placeholder="Search by name or SKU" style={{ flex: 1 }} />
        <button>New product</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>SKU</th><th>Category</th><th>UOM</th><th>Total Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="5">No products yet.</td></tr>
          ) : (
            products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td><td>{p.sku}</td><td>{p.category}</td><td>{p.uom}</td><td>{p.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Layout>
  );
}