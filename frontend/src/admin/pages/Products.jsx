import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiToggleLeft,
  FiToggleRight,
  FiX,
  FiUpload,
  FiStar,
  FiTrash2
} from "react-icons/fi";
import api from "../../api/api";

/* ================= DEFAULT ================= */

const emptyVariant = {
  colorName: "",
  colorHex: "#000000",
  images: [],
  previews: [],
  sizes: [{ size: "", stock: "" }]
};

const emptyForm = {
  title: "",
  description: "",
  brand: "",
  mainCategory: "",
  prodCategory: "",
  subCategory: "",
  price: "",
  mrp: "",
  featuredScore: 0,
  design: "solid",
  fit: "regular",
  rating: 0,
  isActive: true,
  variants: [structuredClone(emptyVariant)]
};

export default function Products() {

  /* ================= STATES ================= */

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [mainCats, setMainCats] = useState([]);
  const [prodCats, setProdCats] = useState([]);
  const [subCats, setSubCats] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= LOAD ================= */

  const loadData = async () => {
    try {
      setLoading(true);

      const [p, b, mc, pc, sc] = await Promise.all([
        api.get("/admin/products"),
        api.get("/admin/brands"),
        api.get("/admin/categories/main"),
        api.get("/admin/categories/product"),
        api.get("/admin/categories/sub")
      ]);

      setProducts(p.data?.data || []);
      setBrands(b.data || []);
      setMainCats(mc.data || []);
      setProdCats(pc.data || []);
      setSubCats(sc.data || []);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= HELPERS ================= */

  const openAdd = () => {
    setEditId(null);
    setForm(structuredClone(emptyForm));
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  /* ✅ FIXED EDIT */
  const openEdit = p => {
    setEditId(p._id);

    setForm({
      ...p,

      variants: p.variants.map(v => ({
        colorName: v.colorName || "",
        colorHex: v.colorHex || "#000000",

        images: [],

        previews: Array.isArray(v.images)
          ? v.images
          : [],

        sizes: v.sizes || [{ size: "", stock: "" }]
      }))
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const toggleProduct = async id => {
    await api.patch(`/admin/products/${id}/toggle`);
    loadData();
  };

  /* ================= VARIANTS ================= */

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, structuredClone(emptyVariant)]
    }));
  };

  const removeVariant = index => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const addSize = i => {
    setForm(prev => {
      const variants = [...prev.variants];

      variants[i] = {
        ...variants[i],
        sizes: [...variants[i].sizes, { size: "", stock: "" }]
      };

      return { ...prev, variants };
    });
  };

  /* ✅ FIXED UPLOAD */
  const handleImages = (i, files) => {
    if (!files || files.length === 0) return;

    const arr = Array.from(files);

    if (arr.length < 1 || arr.length > 6) {
      alert("Upload 1–6 images only");
      return;
    }

    const previews = arr.map(file =>
      URL.createObjectURL(file)
    );

    setForm(prev => {
      const variants = [...prev.variants];

      variants[i] = {
        ...variants[i],
        images: arr,
        previews
      };

      return { ...prev, variants };
    });
  };

  /* ================= SAVE ================= */

  const saveProduct = async e => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (k === "variants" || v === "" || v === null) return;
        fd.append(k, v);
      });

      fd.append(
        "variants",
        JSON.stringify(
          form.variants.map(v => ({
            colorName: v.colorName,
            colorHex: v.colorHex,
            sizes: v.sizes
          }))
        )
      );

      form.variants.forEach((v, i) => {
        v.images.forEach(img => {
          fd.append(`variantImages_${i}`, img);
        });
      });

      if (editId) {
        await api.put(`/admin/products/${editId}`, fd);
        setSuccess("Product updated");
      } else {
        await api.post("/admin/products", fd);
        setSuccess("Product added");
        setForm(structuredClone(emptyForm));
      }

      await loadData();

      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ================= VALIDATION ================= */

  const isValid =
    form.title &&
    form.brand &&
    form.mainCategory &&
    form.prodCategory &&
    form.price &&
    form.mrp &&
    form.variants.every(
      v =>
        v.colorName &&
        v.sizes.length &&
        Array.isArray(v.previews) &&
        v.previews.length >= 1
    );

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-[#8E8E8E]">
        Loading…
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-8">

        <div>
          <h1 className="text-3xl font-semibold text-[#0B0B0B]">
            Products
          </h1>

          <p className="text-sm text-[#8E8E8E]">
            Luxury product management
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full shadow"
        >
          <FiPlus /> Add Product
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#F7F7F7] text-[#8E8E8E]">

            <tr>
              <th className="p-4 text-left">Product</th>
              <th>Brand</th>
              <th>Design</th>
              <th>Fit</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>

          </thead>

          <tbody>

            {products.map(p => (
              <tr
                key={p._id}
                className="border-t hover:bg-[#F7F7F7]"
              >

                <td className="p-4">
                  <div className="font-medium text-[#1A1A1A]">
                    {p.title}
                  </div>

                  <div className="text-xs text-[#8E8E8E]">
                    {p.mainCategory}/{p.prodCategory}/{p.subCategory || "-"}
                  </div>
                </td>

                <td>{p.brand}</td>
                <td>{p.design}</td>
                <td>{p.fit}</td>

                <td>
                  ₹{p.price}
                  <div className="text-xs line-through text-[#8E8E8E]">
                    ₹{p.mrp}
                  </div>
                </td>

                <td className="flex items-center gap-1 text-[#C9A24D]">
                  <FiStar />
                  {p.rating || 0}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      p.isActive
                        ? "bg-[#C9A24D]/20 text-[#C9A24D]"
                        : "bg-[#E5E5E5] text-[#8E8E8E]"
                    }`}
                  >
                    {p.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="p-4 flex justify-end gap-4">

                  <button onClick={() => openEdit(p)}>
                    <FiEdit />
                  </button>

                  <button onClick={() => toggleProduct(p._id)}>
                    {p.isActive
                      ? <FiToggleRight />
                      : <FiToggleLeft />
                    }
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">

          {/* YOUR FORM HERE (already correct) */}
         
             <form
  onSubmit={saveProduct}
  className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl p-10 relative shadow-2xl"
>

  {/* CLOSE */}
  <button
    type="button"
    onClick={() => setShowForm(false)}
    className="absolute top-5 right-5 text-[#8E8E8E] hover:text-black"
  >
    <FiX size={20} />
  </button>

  {/* HEADER */}
  <div className="mb-8 border-b pb-4">
    <h2 className="text-2xl font-semibold text-[#0B0B0B]">
      {editId ? "Edit Product" : "Add New Product"}
    </h2>

    <p className="text-sm text-[#8E8E8E] mt-1">
      Create premium fashion products
    </p>
  </div>

  {/* STATUS */}
  {error && (
    <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600">
      {error}
    </div>
  )}

  {success && (
    <div className="mb-5 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
      {success}
    </div>
  )}

  {/* BASIC INFO */}
  <div className="mb-10">

    <h3 className="text-lg font-semibold border-b pb-2 mb-4">
      Basic Information
    </h3>

    <div className="grid grid-cols-2 gap-5">

      {[
        ["Title", "title"],
        ["Description", "description"],
        ["Price", "price"],
        ["MRP", "mrp"]
      ].map(([label, key]) => (
        <div key={key}>
          <label className="text-sm font-medium text-[#1A1A1A] mb-1 block">
            {label}
          </label>

          <input
            required
            value={form[key]}
            onChange={e =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl
            focus:ring-2 focus:ring-[#C9A24D]/30 focus:border-[#C9A24D]
            outline-none transition"
          />
        </div>
      ))}

      {/* SELECTS */}

      {[
        ["Brand", "brand", brands],
        ["Main Category", "mainCategory", mainCats],
        ["Product Category", "prodCategory", prodCats],
        ["Sub Category", "subCategory", subCats, true]
      ].map(([label, key, list, optional]) => (
        <div key={key}>
          <label className="text-sm font-medium text-[#1A1A1A] mb-1 block">
            {label}
            {optional && (
              <span className="text-xs text-[#8E8E8E] ml-1">
                (optional)
              </span>
            )}
          </label>

          <select
            value={form[key]}
            onChange={e =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl
            bg-white focus:ring-2 focus:ring-[#C9A24D]/30
            focus:border-[#C9A24D] outline-none transition"
          >
            <option value="">Select</option>

            {list.map(i => (
              <option key={i._id} value={i.slug}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      ))}

    </div>
  </div>

  {/* VARIANTS */}
  <div className="mb-10">

    <h3 className="text-lg font-semibold border-b pb-2 mb-4">
      Variants
    </h3>

    {form.variants.map((v, i) => (
      <div
        key={i}
        className="border border-[#E5E5E5] rounded-2xl p-5 mb-5 bg-[#F7F7F7]"
      >

        {/* HEADER */}
        <div className="flex justify-between mb-4">

          <h4 className="font-medium">
            Variant {i + 1}
          </h4>

          {form.variants.length > 1 && (
            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          )}

        </div>

        {/* COLOR + UPLOAD */}
        <div className="grid grid-cols-3 gap-4 mb-4">

          {/* Color Name */}
          <input
            placeholder="Color Name"
            value={v.colorName}
            onChange={e => {
              const vars = [...form.variants];
              vars[i].colorName = e.target.value;
              setForm({ ...form, variants: vars });
            }}
            className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl"
          />

          {/* Color Picker */}
          <input
            type="color"
            value={v.colorHex}
            onChange={e => {
              const vars = [...form.variants];
              vars[i].colorHex = e.target.value;
              setForm({ ...form, variants: vars });
            }}
            className="h-12 rounded-xl border"
          />

          {/* Upload */}
          <label
            className="flex items-center justify-center gap-2 h-12
            border-2 border-dashed border-[#C9A24D]
            rounded-xl cursor-pointer text-sm text-[#8E8E8E]
            hover:bg-[#F7F7F7] transition"
          >
            <FiUpload />
            Upload (1–6)

            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={e => handleImages(i, e.target.files)}
            />
          </label>

        </div>

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-6 gap-3 mb-4">

          {v.previews.map((img, k) => (
            <div
              key={k}
              className="relative group"
            >

              <img
                src={img}
                className="w-full h-24 object-cover rounded-xl border"
              />

              <button
                type="button"
                onClick={() => {
                  const vars = [...form.variants];

                  vars[i].images.splice(k, 1);
                  vars[i].previews.splice(k, 1);

                  setForm({ ...form, variants: vars });
                }}
                className="absolute -top-2 -right-2 bg-black text-white
                w-5 h-5 rounded-full text-xs
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

            </div>
          ))}

        </div>

        {/* SIZES */}
        {v.sizes.map((s, j) => (
          <div key={j} className="flex gap-3 mb-2">

            <input
              placeholder="Size"
              value={s.size}
              onChange={e => {
                const vars = [...form.variants];
                vars[i].sizes[j].size = e.target.value;
                setForm({ ...form, variants: vars });
              }}
              className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl"
            />

            <input
              placeholder="Stock"
              value={s.stock}
              onChange={e => {
                const vars = [...form.variants];
                vars[i].sizes[j].stock = e.target.value;
                setForm({ ...form, variants: vars });
              }}
              className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl"
            />

          </div>
        ))}

        <button
          type="button"
          onClick={() => addSize(i)}
          className="text-[#C9A24D] text-sm mt-1"
        >
          + Add Size
        </button>

      </div>
    ))}

    <button
      type="button"
      onClick={addVariant}
      className="text-[#C9A24D] text-sm"
    >
      + Add Variant
    </button>

  </div>

  {/* ACTION */}
  <div className="flex justify-end gap-4 border-t pt-6">

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
      className={`px-8 py-3 rounded-full font-medium ${
        saving || !isValid
          ? "bg-gray-300 text-gray-500"
          : "bg-black text-white hover:opacity-90"
      }`}
    >
      {saving ? "Saving..." : "Save Product"}
    </button>

  </div>

  </form>
        </div>
      )}

    </div>
  );
}


