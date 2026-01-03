import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  LayoutGrid,
  List,
  Search,
  Edit3,
  Package,
  Trash2,
  X,
} from "lucide-react"; // Note: standard icons

const PAGE_SIZE = 6;

export default function App() {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Apple iPhone 15",
      price: 79999,
      category: "Electronics",
      stock: 12,
      description: "Latest model with A16 Bionic chip",
    },
    {
      id: 2,
      name: "Nike Air Max",
      price: 12500,
      category: "Fashion",
      stock: 5,
      description: "Comfortable premium running shoes",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 29999,
      category: "Electronics",
      stock: 0,
      description: "Industry leading noise canceling",
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 29999,
      category: "Electronics",
      stock: 0,
      description: "Industry leading noise canceling",
    },

    {
      id: 4,
      name: "Dell XPS 13",
      price: 115000,
      category: "Electronics",
      stock: 8,
      description: "Powerful ultrabook for professionals",
    },
  ]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleSave(product) {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    setEditing(null);
  }

  function deleteProduct(id) {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 font-sans pb-12">
      {/* Header Section */}
      <header className=" border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-white gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Package className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              InvenTrack
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setEditing({})}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 font-medium"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Filters & View Toggle */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                view === "grid"
                  ? "bg-white shadow-sm text-indigo-600 font-semibold"
                  : "text-slate-500"
              }`}
            >
              <LayoutGrid size={18} />{" "}
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                view === "list"
                  ? "bg-white shadow-sm text-indigo-600 font-semibold"
                  : "text-slate-500"
              }`}
            >
              <List size={18} /> <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </section>

        {/* Product Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">
              No products found matching your search.
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={setEditing}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProducts.map((p) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    onEdit={setEditing}
                    onDelete={deleteProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-medium transition-all ${
                  page === i + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {editing !== null && (
        <ProductForm
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Sub-component for Grid View
function ProductCard({ product, onEdit, onDelete }) {
  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {product.category}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(product)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
        {product.name}
      </h3>
      <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
        {product.description}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-black text-slate-900">
            ₹{product.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isOutOfStock
                  ? "bg-red-500"
                  : isLowStock
                  ? "bg-orange-500"
                  : "bg-emerald-500"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                isOutOfStock
                  ? "text-red-600"
                  : isLowStock
                  ? "text-orange-600"
                  : "text-emerald-600"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isLowStock
                ? `Only ${product.stock} left`
                : `${product.stock} in stock`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Table Row
function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 font-semibold text-slate-800">{product.name}</td>
      <td className="px-6 py-4 text-slate-600">{product.category}</td>
      <td className="px-6 py-4 font-bold">₹{product.price.toLocaleString()}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
            product.stock === 0
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {product.stock} Units
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onEdit(product)}
          className="text-indigo-600 hover:underline font-medium mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={18} className="inline" />
        </button>
      </td>
    </tr>
  );
}

function ProductForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState({
    id: initial.id,
    name: initial.name || "",
    price: initial.price || "",
    category: initial.category || "",
    stock: initial.stock || "",
    description: initial.description || "",
  });

  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const eObj = {};
    if (!form.name) eObj.name = "Required";
    if (!form.price) eObj.price = "Required";
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      onSave({ ...form, price: Number(form.price), stock: Number(form.stock) });
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {form.id ? "Update Product" : "New Product"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Product Name
              </label>
              <input
                className={`w-full border rounded-xl p-3 outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 ring-red-100"
                    : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500"
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Living">Home & Living</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 min-h-[100px]"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
