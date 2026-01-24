import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiEdit, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    mrp: "",
    category: "",
    brand: "",
    image: "",
    variants: [
      { color: "Black", size: "M", stock: 10 },
    ],
  });

  const loadData = () => {
    axios.get("http://localhost:3000/api/admin/products")
      .then(res => setProducts(res.data));

    axios.get("http://localhost:3000/api/categories")
      .then(res => setCategories(res.data));

    axios.get("http://localhost:3000/api/brands")
      .then(res => setBrands(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({
      title: "",
      price: "",
      mrp: "",
      category: "",
      brand: "",
      image: "",
      variants: [{ color: "", size: "", stock: "" }],
    });
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditId(product._id);
    setForm(product);
    setShowForm(true);
  };

  /* ================= SAVE ================= */
  const saveProduct = (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3000/api/admin/products/${editId}`
      : "http://localhost:3000/api/admin/products";

    const method = editId ? "put" : "post";

    axios[method](url, form)
      .then(() => {
        setShowForm(false);
        loadData();
      })
      .catch(err => console.error(err));
  };

  /* ================= TOGGLE ================= */
  const toggleProduct = (id) => {
    axios
      .patch(`http://localhost:3000/api/admin/products/${id}/toggle`)
      .then(loadData);
  };

  /* ================= VARIANTS ================= */
  const updateVariant = (i, field, value) => {
    const updated = [...form.variants];
    updated[i][field] = value;
    setForm({ ...form, variants: updated });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { color: "", size: "", stock: "" }],
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Products</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-10 h-10 rounded object-cover"
                  />
                  {p.title}
                </td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>₹{p.price}</td>
                <td>
                  <span className={`px-2 py-1 text-xs rounded ${
                    p.isActive ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {p.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-3">
                  <button onClick={() => openEdit(p)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => toggleProduct(p._id)}>
                    {p.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form
            onSubmit={saveProduct}
            className="bg-white p-6 rounded-xl w-full max-w-2xl"
          >
            <h2 className="font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded" />

              <input required placeholder="Image URL"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                className="border p-2 rounded" />

              <input required placeholder="Price"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="border p-2 rounded" />

              <input required placeholder="MRP"
                value={form.mrp}
                onChange={e => setForm({ ...form, mrp: e.target.value })}
                className="border p-2 rounded" />

              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map(c => (
                  <option key={c._id} value={c.slug}>{c.name}</option>
                ))}
              </select>

              <select
                value={form.brand}
                onChange={e => setForm({ ...form, brand: e.target.value })}
                className="border p-2 rounded">
                <option value="">Select Brand</option>
                {brands.map(b => (
                  <option key={b._id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* VARIANTS */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Variants</h3>
              {form.variants.map((v, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                  <input placeholder="Color" value={v.color}
                    onChange={e => updateVariant(i, "color", e.target.value)}
                    className="border p-2 rounded" />

                  <input placeholder="Size" value={v.size}
                    onChange={e => updateVariant(i, "size", e.target.value)}
                    className="border p-2 rounded" />

                  <input placeholder="Stock" value={v.stock}
                    onChange={e => updateVariant(i, "stock", e.target.value)}
                    className="border p-2 rounded" />
                </div>
              ))}
              <button type="button" onClick={addVariant}
                className="text-sm text-blue-600 mt-2">
                + Add Variant
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
