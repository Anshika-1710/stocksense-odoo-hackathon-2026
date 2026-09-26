import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="My profile" />
        <main className="p-8">
          <div className="bg-white rounded-lg border border-black/5 p-6 max-w-md space-y-3">
            <p><span className="text-slate">Name:</span> {user?.name}</p>
            <p><span className="text-slate">Email:</span> {user?.email}</p>
            <p><span className="text-slate">Role:</span> {user?.role}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
