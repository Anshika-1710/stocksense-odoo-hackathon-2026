import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Layout title="My Profile">
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", padding: 24, maxWidth: 400 }}>
        <p style={{ marginBottom: 10 }}><strong>Name:</strong> {user?.name || "—"}</p>
        <p style={{ marginBottom: 10 }}><strong>Email:</strong> {user?.email || "—"}</p>
        <p><strong>Role:</strong> Inventory Manager</p>
      </div>
    </Layout>
  );
}