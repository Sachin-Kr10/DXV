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
    
    </>
  )
}

export default Sidebar