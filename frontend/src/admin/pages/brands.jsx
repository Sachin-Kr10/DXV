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

/* ================= DEFAULT ================= */

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
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    setForm({ ...emptyForm });
    setError("");
    setSuccess("");
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

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const saveBrand = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

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
        setSuccess("Brand updated successfully");
      } else {
        await api.post("/admin/brands", fd);
        setSuccess("Brand added successfully");
      }

      await loadData();

      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save brand"
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleBrand = async (id) => {
    await api.patch(`/admin/brands/${id}/toggle`);
    loadData();
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
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white"
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

                <td className="capitalize">
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
                    {b.isActive
                      ? <FiToggleRight />
                      : <FiToggleLeft />
                    }
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <form
            onSubmit={saveBrand}
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh]
            overflow-y-auto p-8 relative shadow-2xl"
          >

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#8E8E8E]"
            >
              <FiX />
            </button>

            {/* HEADER */}
            <h2 className="text-xl font-semibold mb-6">
              {editId ? "Edit Brand" : "Add Brand"}
            </h2>

            {/* STATUS */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                {success}
              </div>
            )}

            {/* NAME */}
            <input
              required
              placeholder="Brand Name"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mb-5 border border-[#E5E5E5]
              p-3 rounded-xl focus:ring-2 focus:ring-black/20"
            />

            {/* ORDER */}
            <div className="mb-5">

              <p className="text-sm font-medium mb-2">
                Display Order
              </p>

              <div className="flex border rounded-xl overflow-hidden">

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      sortOrder: Math.max(0, form.sortOrder - 1)
                    })
                  }
                  className="w-12 h-12 bg-[#F7F7F7]
                  hover:bg-black hover:text-white font-semibold"
                >
                  −
                </button>

                <input
                  type="number"
                  min="0"
                  value={form.sortOrder}
                  onChange={e =>
                    setForm({
                      ...form,
                      sortOrder: Math.max(0, Number(e.target.value) || 0)
                    })
                  }
                  className="flex-1 text-center outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      sortOrder: form.sortOrder + 1
                    })
                  }
                  className="w-12 h-12 bg-[#F7F7F7]
                  hover:bg-black hover:text-white font-semibold"
                >
                  +
                </button>

              </div>
            </div>

            {/* CATEGORIES */}
            <div className="mb-6">

              <p className="text-sm font-medium mb-3">
                Main Categories
              </p>

              <div className="grid grid-cols-2 gap-3">

                {mainCats.map(c => {
                  const checked =
                    form.mainCategories.includes(c.slug);

                  return (
                    <label
                      key={c._id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer
                      ${
                        checked
                          ? "border-black bg-black/5"
                          : "border-[#E5E5E5]"
                      }`}
                    >

                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => {
                          if (e.target.checked) {
                            setForm({
                              ...form,
                              mainCategories: [
                                ...form.mainCategories,
                                c.slug
                              ]
                            });
                          } else {
                            setForm({
                              ...form,
                              mainCategories: form.mainCategories.filter(
                                x => x !== c.slug
                              )
                            });
                          }
                        }}
                        className="hidden"
                      />

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center
                        ${
                          checked
                            ? "bg-black border-black"
                            : "border-[#CFCFCF]"
                        }`}
                      >
                        {checked && (
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      <span className="text-sm font-medium capitalize">
                        {c.name}
                      </span>

                    </label>
                  );
                })}

              </div>
            </div>

            {/* LOGO */}
            <label className="flex items-center gap-2 text-sm text-[#8E8E8E] cursor-pointer mb-6">
              <FiUpload /> Upload Brand Logo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={e =>
                  setForm({
                    ...form,
                    logo: e.target.files[0]
                  })
                }
              />
            </label>

            {form.logo && (
              <img
                src={URL.createObjectURL(form.logo)}
                className="w-20 h-20 mb-6 rounded-xl border object-contain"
                alt="Preview"
              />
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 pt-4 border-t">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-[#8E8E8E]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2.5 rounded-full font-medium
                ${
                  saving
                    ? "bg-gray-300 text-gray-500"
                    : "bg-black text-white"
                }`}
              >
                {saving ? "Saving..." : "Save Brand"}
              </button>

            </div>

          </form>
        </div>
      )}

    </div>
  );
}
