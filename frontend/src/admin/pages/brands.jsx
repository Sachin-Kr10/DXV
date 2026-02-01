import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiToggleLeft,
  FiToggleRight,
  FiX,
  FiUpload
} from "react-icons/fi";
import api from "../../api/api";

/* ================= DEFAULT FORM ================= */

const emptyForm = {
  name: "",
  logo: null,
  mainCategories: [],
  sortOrder: 0
};

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [mainCats, setMainCats] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */

  const loadData = async () => {
    setLoading(true);
    try {
      const [b, m] = await Promise.all([
        api.get("/admin/brands"),
        api.get("/admin/categories/main")
      ]);

      setBrands(b.data || []);
      setMainCats(m.data || []);
    } catch (err) {
      console.error("Failed to load brands", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FORM ================= */

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (brand) => {
    setEditId(brand._id);
    setForm({
      name: brand.name,
      logo: null,
      mainCategories: brand.mainCategories || [],
      sortOrder: brand.sortOrder || 0
    });
    setShowForm(true);
  };

  const saveBrand = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("sortOrder", Number(form.sortOrder));

    form.mainCategories.forEach(c =>
      fd.append("mainCategories", c)
    );

    if (form.logo) fd.append("logo", form.logo);

    try {
      if (editId) {
        await api.put(`/admin/brands/${editId}`, fd);
      } else {
        await api.post("/admin/brands", fd);
      }

      setShowForm(false);
      loadData();
    } catch (err) {
      console.error("Save brand failed", err);
    }
  };

  const toggleBrand = async (id) => {
    try {
      await api.patch(`/admin/brands/${id}/toggle`);
      loadData();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-6 text-[#8E8E8E]">
        Loading brands…
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F7F7F7] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0B0B0B]">
            Brands
          </h1>
          <p className="text-sm text-[#8E8E8E]">
            Manage brand partners & visibility
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#000000] text-white"
        >
          <FiPlus /> Add Brand
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7] text-[#8E8E8E]">
            <tr>
              <th className="p-4 text-left">Brand</th>
              <th>Main Categories</th>
              <th>Order</th>
              <th>Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map(b => (
              <tr
                key={b._id}
                className="border-t hover:bg-[#F7F7F7]"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="w-12 h-12 rounded-xl object-contain border bg-white"
                  />
                  <div>
                    <div className="font-medium text-[#1A1A1A]">
                      {b.name}
                    </div>
                    <div className="text-xs text-[#8E8E8E]">
                      {b.slug}
                    </div>
                  </div>
                </td>

                <td className="capitalize text-sm">
                  {b.mainCategories.join(", ")}
                </td>

                <td className="font-medium">
                  {b.sortOrder}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      b.isActive
                        ? "bg-[#C9A24D]/20 text-[#C9A24D]"
                        : "bg-[#E5E5E5] text-[#8E8E8E]"
                    }`}
                  >
                    {b.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4 flex justify-end gap-4">
                  <button onClick={() => openEdit(b)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => toggleBrand(b._id)}>
                    {b.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {brands.length === 0 && (
          <div className="p-6 text-center text-[#8E8E8E]">
            No brands created yet
          </div>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={saveBrand}
            className="bg-white rounded-2xl w-full max-w-xl p-8 relative"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#8E8E8E]"
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-6">
              {editId ? "Edit Brand" : "Add Brand"}
            </h2>

            <input
              placeholder="Brand Name"
              required
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mb-4 border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Sort Order"
              value={form.sortOrder}
              onChange={e =>
                setForm({ ...form, sortOrder: e.target.value })
              }
              className="w-full mb-4 border p-3 rounded-lg"
            />

            <select
              multiple
              value={form.mainCategories}
              onChange={e =>
                setForm({
                  ...form,
                  mainCategories: [...e.target.selectedOptions].map(o => o.value)
                })
              }
              className="w-full mb-4 border p-3 rounded-lg h-[120px]"
            >
              {mainCats.map(c => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* LOGO UPLOAD */}
            <label className="flex items-center gap-2 text-sm text-[#8E8E8E] cursor-pointer mb-6">
              <FiUpload />
              Upload Brand Logo
              <input
                type="file"
                accept="image/*"
                onChange={e =>
                  setForm({ ...form, logo: e.target.files[0] })
                }
                className="hidden"
              />
            </label>

            {form.logo && (
              <img
                src={URL.createObjectURL(form.logo)}
                className="w-20 h-20 mb-6 rounded-xl object-contain border"
              />
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-[#8E8E8E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#000000] text-white px-6 py-2.5 rounded-full"
              >
                Save Brand
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
