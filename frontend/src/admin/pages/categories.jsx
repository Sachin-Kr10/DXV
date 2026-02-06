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
  const [saving, setSaving] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");


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

  setSaving(true);
  setError("");
  setSuccess("");

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

  try {
    if (editId) {
      await api.put(`${base}/${editId}`, fd);
      setSuccess("Updated successfully");
    } else {
      await api.post(base, fd);
      setSuccess("Added successfully");
    }

    await loadAll();

    setTimeout(() => {
      setShowForm(false);
      setSuccess("");
    }, 1200);

  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to save"
    );
  } finally {
    setSaving(false);
  }
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
     {/* MODAL */}
{showForm && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <form
      onSubmit={save}
      className="bg-white w-full max-w-xl max-h-[90vh]
      overflow-y-auto rounded-2xl p-8 relative shadow-2xl"
    >

      {/* CLOSE */}
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="absolute top-4 right-4 text-[#8E8E8E] hover:text-black transition"
      >
        <FiX />
      </button>

      {/* HEADER */}
      <h2 className="text-xl font-semibold mb-6">
        {editId ? "Edit" : "Add"} {tab.toUpperCase()}
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
        placeholder="Name"
        value={form.name || ""}
        onChange={e =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full mb-5 border border-[#E5E5E5] p-3 rounded-xl
        focus:ring-2 focus:ring-black/20 outline-none"
      />

      {/* ORDER (STEPPER) */}
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
                sortOrder: Math.max(0, (form.sortOrder || 0) - 1)
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
            value={form.sortOrder || 0}
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
                sortOrder: (form.sortOrder || 0) + 1
              })
            }
            className="w-12 h-12 bg-[#F7F7F7]
            hover:bg-black hover:text-white font-semibold"
          >
            +
          </button>

        </div>
      </div>

      {/* MAIN */}
      {tab !== "main" && (
        <select
          value={form.mainCategory || ""}
          onChange={e =>
            setForm({ ...form, mainCategory: e.target.value })
          }
          required
          className="w-full mb-5 border border-[#E5E5E5] p-3 rounded-xl
          focus:ring-2 focus:ring-black/20 outline-none"
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
          required
          className="w-full mb-5 border border-[#E5E5E5] p-3 rounded-xl
          focus:ring-2 focus:ring-black/20 outline-none"
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

      {/* BRANDS (PREMIUM CHECKBOX) */}
      {(tab === "product" || tab === "sub") && (
        <div className="mb-6">

          <p className="text-sm font-medium mb-3">
            Select Brands
          </p>

          <div className="grid grid-cols-2 gap-3 max-h-[160px] overflow-y-auto">

            {brands.map(b => {
              const checked =
                form.brands?.includes(b.slug);

              return (
                <label
                  key={b._id}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer transition
                  ${
                    checked
                      ? "border-black bg-black/5"
                      : "border-[#E5E5E5]"
                  }`}
                >

                  <input
                    type="checkbox"
                    hidden
                    checked={checked}
                    onChange={e => {
                      if (e.target.checked) {
                        setForm(prev => ({
                          ...prev,
                          brands: [
                            ...(prev.brands || []),
                            b.slug
                          ]
                        }));
                      } else {
                        setForm(prev => ({
                          ...prev,
                          brands: prev.brands.filter(
                            x => x !== b.slug
                          )
                        }));
                      }
                    }}
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

                  <span className="text-sm font-medium">
                    {b.name}
                  </span>

                </label>
              );
            })}

          </div>
        </div>
      )}

      {/* IMAGE */}
      {tab === "product" && (
        <>
          {preview && (
            <img
              src={preview}
              className="w-28 h-28 rounded-xl border object-cover mb-3"
            />
          )}

          <label className="flex items-center gap-2 text-sm text-[#8E8E8E] cursor-pointer mb-5">

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
          disabled={saving || !isValid}
          className={`px-6 py-2.5 rounded-full font-medium transition
          ${
            saving || !isValid
              ? "bg-gray-300 text-gray-500"
              : "bg-black text-white hover:opacity-90"
          }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>

      </div>

    </form>
  </div>
)}

    </div>
  );
}
