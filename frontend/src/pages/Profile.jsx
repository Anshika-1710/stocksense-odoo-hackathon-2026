import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Layout title="My Profile">
      <div style={{
        background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)", padding: 26, maxWidth: 400
      }}>
        <p style={{ marginBottom: 10 }}><strong>Name:</strong> {user?.name || "—"}</p>
        <p style={{ marginBottom: 10 }}><strong>Email:</strong> {user?.email || "—"}</p>
        <p><strong>Role:</strong> Inventory Manager</p>
      </div>
    </Layout>
  );
}