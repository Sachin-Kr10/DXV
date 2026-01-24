import { Routes, Route, Navigate } from "react-router";

import Sidebar from "./components/AdminSidebar";
import Header from "./components/AdminHeader";
import Dashboard from "./pages/dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6 bg-[#F7F7F7] min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />

            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
