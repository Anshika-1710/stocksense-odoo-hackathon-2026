import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";

export default function Settings() {
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [whForm, setWhForm] = useState({ name: "", code: "" });
  const [locForm, setLocForm] = useState({ name: "", warehouse: "" });
  const [error, setError] = useState("");

  const load = () => {
    api.get("/warehouses").then((res) => setWarehouses(res.data));
    api.get("/warehouses/locations/all").then((res) => setLocations(res.data));
  };

  useEffect(load, []);

  const addWarehouse = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/warehouses", whForm);
      setWhForm({ name: "", code: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create warehouse");
    }
  };

  const addLocation = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/warehouses/locations", locForm);
      setLocForm({ name: "", warehouse: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create location");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar title="Warehouses & locations" />
        <main className="p-8 grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg border border-black/5 p-5 space-y-4">
            <p className="font-medium text-ink">Warehouses</p>
            <form onSubmit={addWarehouse} className="flex gap-2">
              <input required placeholder="Name" value={whForm.name}
                onChange={(e) => setWhForm({ ...whForm, name: e.target.value })}
                className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm" />
              <input required placeholder="Code" value={whForm.code}
                onChange={(e) => setWhForm({ ...whForm, code: e.target.value })}
                className="w-24 rounded-md border border-black/10 px-3 py-2 text-sm" />
              <button className="rounded-md bg-ink text-white px-4 py-2 text-sm">Add</button>
            </form>
            <ul className="text-sm divide-y divide-black/5">
              {warehouses.map((w) => (
                <li key={w._id} className="py-2 flex justify-between">
                  <span>{w.name}</span><span className="text-slate">{w.code}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-lg border border-black/5 p-5 space-y-4">
            <p className="font-medium text-ink">Locations</p>
            <form onSubmit={addLocation} className="flex gap-2">
              <input required placeholder="Name (e.g. Rack A)" value={locForm.name}
                onChange={(e) => setLocForm({ ...locForm, name: e.target.value })}
                className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm" />
              <select required value={locForm.warehouse}
                onChange={(e) => setLocForm({ ...locForm, warehouse: e.target.value })}
                className="rounded-md border border-black/10 px-3 py-2 text-sm">
                <option value="">Warehouse</option>
                {warehouses.map((w) => <option key={w._id} value={w._id}>{w.name}</option>)}
              </select>
              <button className="rounded-md bg-ink text-white px-4 py-2 text-sm">Add</button>
            </form>
            <ul className="text-sm divide-y divide-black/5">
              {locations.map((l) => (
                <li key={l._id} className="py-2 flex justify-between">
                  <span>{l.name}</span><span className="text-slate">{l.warehouse?.name}</span>
                </li>
              ))}
            </ul>
          </section>
          {error && <p className="text-sm text-signal md:col-span-2">{error}</p>}
        </main>
      </div>
    </div>
  );
}
