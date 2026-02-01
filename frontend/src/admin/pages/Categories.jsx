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

const emptyMain = { name: "", sortOrder: 0 };

const emptyProd = {
  name: "",
  mainCategory: "",
  brands: [],
  image: null,
  sortOrder: 0
};

const emptySub = {
  name: "",
  mainCategory: "",
  prodCategory: "",
  brands: [],
  sortOrder: 0
};

export default function Category() {
  const [tab, setTab] = useState("main");

  const [mainCats, setMainCats] = useState([]);
  const [prodCats, setProdCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [brands, setBrands] = useState([]);

  const [form, setForm] = useState(emptyMain);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [preview, setPreview] = useState(null);

  /* ================= LOAD ================= */

  const loadAll = async () => {
    try {
      setLoading(true);

      const [m, p, s, b] = await Promise.all([
        api.get("/admin/categories/main"),
        api.get("/admin/categories/product"),
        api.get("/admin/categories/sub"),
        api.get("/admin/brands")
      ]);

      setMainCats(m.data || []);
      setProdCats(p.data || []);
      setSubCats(s.data || []);
      setBrands(b.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  /* ================= FORM ================= */

  const openAdd = () => {
    setEditId(null);
    setPreview(null);

    setForm(
      tab === "main"
        ? emptyMain
        : tab === "product"
        ? emptyProd
        : emptySub
    );

    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item._id);

    setForm({
      ...item,
      image: null
    });

    setPreview(item.image || null);
    setShowForm(true);
  };

  /* ================= SAVE ================= */

  const save = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (v === null || v === "") return;

      if (Array.isArray(v)) {
        v.forEach(val => fd.append(k, val));
      } else {
        fd.append(k, v);
      }
    });

    const base = `/admin/categories/${tab}`;

    if (editId) {
      await api.put(`${base}/${editId}`, fd);
    } else {
      await api.post(base, fd);
    }

    setShowForm(false);
    loadAll();
  };

  /* ================= TOGGLE ================= */

  const toggle = async (id) => {
    await api.patch(`/admin/categories/product/${id}/toggle`);
    loadAll();
  };

  /* ================= VALIDATION ================= */

  const isValid =
    tab === "main"
      ? form.name
      : tab === "product"
      ? form.name && form.mainCategory && form.brands?.length
      : form.name &&
        form.mainCategory &&
        form.prodCategory &&
        form.brands?.length;

  /* ================= DATA ================= */

  const list =
    tab === "main" ? mainCats : tab === "product" ? prodCats : subCats;

  if (loading) {
    return (
      <div className="p-12 text-center text-[#8E8E8E]">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-3xl font-semibold text-[#0B0B0B]">
            Category Manager
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Premium catalogue control
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-white rounded-full shadow hover:opacity-90 transition"
        >
          <FiPlus /> Add New
        </button>

      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8">

        {["main", "product", "sub"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full text-sm transition ${
              tab === t
                ? "bg-[#000000] text-white"
                : "bg-white border border-[#E5E5E5] text-[#8E8E8E]"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#F7F7F7] text-[#8E8E8E]">
            <tr>
              <th className="p-4 text-left">Name</th>
              {tab !== "main" && <th>Main</th>}
              {tab === "sub" && <th>Product</th>}
              {tab === "product" && <th>Brands</th>}
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>

            {list.map(c => (
              <tr
                key={c._id}
                className="border-t hover:bg-[#F7F7F7] transition"
              >

                <td className="p-4 font-medium text-[#1A1A1A]">
                  {c.name}
                </td>

                {tab !== "main" && (
                  <td className="capitalize text-[#8E8E8E]">
                    {c.mainCategory}
                  </td>
                )}

                {tab === "sub" && (
                  <td className="capitalize text-[#8E8E8E]">
                    {c.prodCategory}
                  </td>
                )}

                {tab === "product" && (
                  <td className="text-xs text-[#8E8E8E] max-w-[220px] truncate">
                    {c.brands?.join(", ")}
                  </td>
                )}

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      c.isActive
                        ? "bg-[#C9A24D]/20 text-[#C9A24D]"
                        : "bg-[#E5E5E5] text-[#8E8E8E]"
                    }`}
                  >
                    {c.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4 flex justify-end gap-4">

                  <button onClick={() => openEdit(c)}>
                    <FiEdit className="text-[#8E8E8E] hover:text-black" />
                  </button>

                  {tab === "product" && (
                    <button onClick={() => toggle(c._id)}>
                      {c.isActive ? (
                        <FiToggleRight className="text-[#C9A24D]" />
                      ) : (
                        <FiToggleLeft className="text-[#8E8E8E]" />
                      )}
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {!list.length && (
          <div className="p-10 text-center text-[#8E8E8E]">
            No data found
          </div>
        )}

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">

          <form
            onSubmit={save}
            className="bg-white w-full max-w-xl rounded-2xl p-8 relative shadow-xl"
          >

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[#8E8E8E]"
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-6 text-[#0B0B0B]">
              {editId ? "Edit" : "Add"} {tab.toUpperCase()}
            </h2>

            {/* NAME */}
            <input
              placeholder="Name"
              required
              value={form.name || ""}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 mb-4 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#C9A24D]"
            />

            {/* SORT */}
            <input
              type="number"
              placeholder="Sort Order"
              value={form.sortOrder || 0}
              onChange={e =>
                setForm({ ...form, sortOrder: e.target.value })
              }
              className="w-full p-3 mb-4 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#C9A24D]"
            />

            {/* MAIN */}
            {tab !== "main" && (
              <select
                value={form.mainCategory || ""}
                onChange={e =>
                  setForm({ ...form, mainCategory: e.target.value })
                }
                className="w-full p-3 mb-4 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#C9A24D]"
                required
              >
                <option value="">Select Main</option>

                {mainCats.map(m => (
                  <option key={m._id} value={m.slug}>
                    {m.name}
                  </option>
                ))}
              </select>
            )}

            {/* PRODUCT */}
            {tab === "sub" && (
              <select
                value={form.prodCategory || ""}
                onChange={e =>
                  setForm({ ...form, prodCategory: e.target.value })
                }
                className="w-full p-3 mb-4 border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#C9A24D]"
                required
              >
                <option value="">Select Product</option>

                {prodCats
                  .filter(p => p.mainCategory === form.mainCategory)
                  .map(p => (
                    <option key={p._id} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
              </select>
            )}

            {/* BRANDS */}
            {(tab === "product" || tab === "sub") && (
              <div className="border border-[#E5E5E5] rounded-xl p-3 mb-4 max-h-[140px] overflow-y-auto">

                <p className="text-xs text-[#8E8E8E] mb-2">
                  Select Brands
                </p>

                {brands.map(b => (
                  <label
                    key={b._id}
                    className="flex items-center gap-2 text-sm mb-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.brands?.includes(b.slug)}
                      onChange={e => {
                        const checked = e.target.checked;

                        setForm(prev => ({
                          ...prev,
                          brands: checked
                            ? [...(prev.brands || []), b.slug]
                            : prev.brands.filter(v => v !== b.slug)
                        }));
                      }}
                    />

                    {b.name}
                  </label>
                ))}

              </div>
            )}

            {/* IMAGE */}
            {tab === "product" && (
              <>
                {preview && (
                  <img
                    src={preview}
                    className="w-32 h-32 rounded-xl object-cover border mb-3"
                  />
                )}

                <label className="flex items-center gap-2 text-sm text-[#8E8E8E] cursor-pointer mb-4">

                  <FiUpload /> Upload Image

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setForm({ ...form, image: file });
                      setPreview(URL.createObjectURL(file));
                    }}
                  />

                </label>
              </>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-8">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-[#8E8E8E]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isValid}
                className={`px-6 py-2.5 rounded-full transition ${
                  isValid
                    ? "bg-black text-white"
                    : "bg-[#E5E5E5] text-[#8E8E8E]"
                }`}
              >
                Save
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}
