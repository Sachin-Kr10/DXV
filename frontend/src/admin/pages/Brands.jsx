import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiEdit, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
  });

  const loadBrands = () => {
    axios
      .get("http://localhost:3000/api/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "" });
    setShowForm(true);
  };

  const openEdit = (brand) => {
    setEditId(brand._id);
    setForm({ name: brand.name });
    setShowForm(true);
  };

  const saveBrand = (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3000/api/admin/brands/${editId}`
      : "http://localhost:3000/api/admin/brands";

    const method = editId ? "put" : "post";

    axios[method](url, form)
      .then(() => {
        setShowForm(false);
        loadBrands();
      })
      .catch((err) => console.error(err));
  };
  const toggleBrand = (id) => {
    axios
      .patch(`http://localhost:3000/api/admin/brands/${id}/toggle`)
      .then(loadBrands)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-[#1A1A1A]">
          Brands
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B0B0B] text-white text-sm"
        >
          <FiPlus /> Add Brand
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="p-4 text-left">Brand Name</th>
              <th>Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id} className="border-t">
                <td className="p-4">{brand.name}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      brand.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {brand.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4 flex justify-end gap-4">
                  <button
                    onClick={() => openEdit(brand)}
                    className="text-[#8E8E8E] hover:text-[#0B0B0B]"
                  >
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => toggleBrand(brand._id)}
                    className="text-[#8E8E8E] hover:text-[#C9A24D]"
                  >
                    {brand.isActive ? (
                      <FiToggleRight size={18} />
                    ) : (
                      <FiToggleLeft size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={saveBrand}
            className="bg-white p-6 rounded-xl w-full max-w-sm"
          >
            <h2 className="font-semibold mb-4">
              {editId ? "Edit Brand" : "Add Brand"}
            </h2>

            <input
              required
              placeholder="Brand name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 text-sm bg-[#0B0B0B] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Brands;
