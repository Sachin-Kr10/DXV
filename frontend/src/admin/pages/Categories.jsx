import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiEdit, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const loadCategories = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/admin/categories"
    );
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", image: "" });
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditId(cat._id);
    setForm({ name: cat.name, image: cat.image });
    setShowForm(true);
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3000/api/admin/categories/${editId}`
      : "http://localhost:3000/api/admin/categories";

    await axios[editId ? "put" : "post"](url, form);
    setShowForm(false);
    loadCategories();
  };

  const toggleCategory = async (id) => {
    await axios.patch(
      `http://localhost:3000/api/admin/categories/${id}/toggle`
    );
    loadCategories();
  };

  const sortedCategories = [...categories].sort(
  (a, b) => b.isActive - a.isActive
);


  return (
    <div className="p-6 bg-[#F7F7F7] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            Categories
          </h1>
          <p className="text-sm text-[#8E8E8E] mt-1">
            Create, edit and control category visibility
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg 
          bg-[#0B0B0B] text-white text-sm font-medium hover:bg-[#000000] transition"
        >
          <FiPlus size={16} />
          Add Category
        </button>
      </div>
      <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F7F7F7]">
            <tr className="text-[#1A1A1A] text-sm">
              <th className="p-5 text-left font-medium">Category</th>
              <th className="p-5 text-left font-medium">Status</th>
              <th className="p-5 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedCategories.map((cat) => (
              <tr
                key={cat._id}
                className="border-t border-[#E5E5E5] hover:bg-[#F7F7F7] transition"
              >
               
                <td className="p-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <span className="text-[15px] font-medium text-[#1A1A1A]">
                      {cat.name}
                    </span>
                  </div>
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                      cat.isActive
                        ? "bg-[#C9A24D]/15 text-[#C9A24D]"
                        : "bg-[#E5E5E5] text-[#8E8E8E]"
                    }`}
                  >
                    {cat.isActive ? "ACTIVE" : "DISABLED"}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex justify-end items-center gap-5">
                    <button
                      onClick={() => openEdit(cat)}
                      className="text-[#8E8E8E] hover:text-[#1A1A1A] transition"
                    >
                      <FiEdit size={22} />
                    </button>

                    <button
                      onClick={() => toggleCategory(cat._id)}
                      className="text-[#8E8E8E] hover:text-[#C9A24D] transition"
                    >
                      {cat.isActive ? (
                        <FiToggleRight size={30} />
                      ) : (
                        <FiToggleLeft size={30} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={saveCategory}
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-5">
              {editId ? "Edit Category" : "Add Category"}
            </h2>

            <div className="space-y-4">
              <input
                required
                placeholder="Category name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm
                focus:outline-none focus:border-[#C9A24D]"
              />

              <input
                required
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm
                focus:outline-none focus:border-[#C9A24D]"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm border border-[#E5E5E5] rounded-lg text-[#8E8E8E]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-sm bg-[#0B0B0B] text-white rounded-lg"
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

export default Categories;
