import { NavLink } from "react-router";
import {
  FiGrid,FiBox,FiLayers,FiTag,
  FiUsers,FiShoppingBag,FiSettings,} from "react-icons/fi";

import React from 'react'

function Sidebar() {
     const linkClass = function ({ isActive }) {
    return `
      flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
      ${
        isActive
          ? "bg-[#C9A24D] text-white"
          : "text-[#E5E5E5] hover:bg-[#1A1A1A]"
      }
    `;
  };
  
  return (
    <>
    <aside className="w-64 min-h-screen bg-[#0B0B0B] p-4">
      {/* LOGO */}
      <div className="px-4 mb-8">
        <h1 className="text-xl font-semibold text-[#C9A24D]">
          DXV Admin
        </h1>
        <p className="text-xs text-[#8E8E8E] mt-1">
          Manage your store
        </p>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <FiGrid size={16} /> Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <FiBox size={16} /> Products
        </NavLink>

        <NavLink to="/admin/categories" className={linkClass}>
          <FiLayers size={16} /> Categories
        </NavLink>

        <NavLink to="/admin/brands" className={linkClass}>
          <FiTag size={16} /> Brands
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <FiShoppingBag size={16} /> Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FiUsers size={16} /> Users
        </NavLink>

        <NavLink to="/admin/settings" className={linkClass}>
          <FiSettings size={16} /> Settings
        </NavLink>
      </nav>
    </aside>
    </>
  )
}

export default Sidebar