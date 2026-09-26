import Layout from "../components/Layout.jsx";

export default function Settings() {
  return (
    <Layout title="Settings">
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginBottom: 14 }}>Warehouses</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Code" />
          <button>Add</button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 20 }}>
        <h2 style={{ marginBottom: 14 }}>Locations</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input type="text" placeholder="Name (e.g. Rack A)" />
          <select><option>Warehouse</option></select>
          <button>Add</button>
        </div>
      </div>
    </Layout>
  );
}
