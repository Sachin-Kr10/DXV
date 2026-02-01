import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-[#E5E5E5] px-6 flex items-center justify-between">
      <h2 className="text-lg font-medium text-[#1A1A1A]">
        Admin Dashboard
      </h2>
      <div className="flex items-center gap-5">
        <button className="text-[#8E8E8E] hover:text-[#0B0B0B]">
          <FiBell size={18} />
        </button>

        <div className="flex items-center gap-2 text-sm text-[#1A1A1A]">
          <FiUser size={16} />
          Admin
        </div>

        <button className="text-[#8E8E8E] hover:text-[#C9A24D]">
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
}
