import React, { useState, useEffect } from 'react';

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [supplier, setSupplier] = useState('');
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    fetch('/api/receipts')
      .then((res) => res.json())
      .then((data) => setReceipts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleValidate = (id) => {
    // Validates receipt and increases stock automatically
    fetch(`/api/receipts/${id}/validate`, { method: 'POST' })
      .then((res) => res.json())
      .then(() => {
        alert('Receipt validated! Stock increased automatically.');
        window.location.reload();
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendor Receipts (Incoming Stock)</h1>
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
          Status: Active Workflow
        </span>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create New Receipt</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Supplier Name"
            className="border p-2 rounded"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Name / SKU"
            className="border p-2 rounded"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity Received"
            className="border p-2 rounded"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save & Mark as Draft
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Reference</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Products</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length > 0 ? (
              receipts.map((r, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{r.reference}</td>
                  <td className="p-3">{r.supplier}</td>
                  <td className="p-3">{r.products}</td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{r.status}</span></td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleValidate(r._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Validate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No receipts found. Create one above to track incoming vendor goods!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
