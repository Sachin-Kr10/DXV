import { Link, NavigationType } from "react-router";
import Search from "./Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MdCompare } from "react-icons/md";
import { IoHeartCircleOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#C9A24D",
    color: "#000",
    fontSize: "10px",
  },
}));

const Logo = () => {
  return (
    <Link
      to="/"
      className="
        group relative inline-flex items-center justify-center
        font-['Playfair_Display']
        text-[20px] sm:text-[22px] lg:text-[28px]
        tracking-[0.25em] lg:tracking-[0.4em]
        text-[#0B0B0B]
        select-none
        overflow-hidden
      "
    >
      
      <span
        className="
          absolute inset-0
          rounded-full
          bg-[radial-gradient(circle_at_center,#C9A24D26,transparent_60%)]
          opacity-0 scale-75 blur-2xl
          lg:group-hover:opacity-100
          lg:group-hover:scale-100
          transition-all duration-700 ease-out
        "
      />
      <span
        className="
          absolute left-0 top-1/2
          h-[1px] w-full
          bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent
          -translate-y-1/2
          scale-x-0
          lg:group-hover:scale-x-100
          transition-transform duration-700 ease-out
        "
      />

      <span className="relative z-10 flex items-center">
        <span className="font-light opacity-90">D</span>

        <span
          className="
            mx-1 lg:mx-2
            font-semibold
            text-[#C9A24D]
            scale-110
            lg:group-hover:scale-125
            transition-transform duration-700 ease-out
          "
        >
          X
        </span>
        <span className="font-light opacity-90">V</span>
      </span>
    </Link>
  );
};

function Header() {
  return (
  <>
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="hidden md:block bg-[#0B0B0B] text-[#F7F7F7] text-[13px] py-2">
        <div className="container flex justify-between items-center">
          <p>Get up to 50% off new season styles</p>
          <div className="flex gap-4">
            <Link className="hover:text-[#C9A24D]" to="/help-center">Help</Link>
            <Link className="hover:text-[#C9A24D]" to="/order-tracking">Track Order</Link>
          </div>
        </div>
      </div>

      <div className="container py-2">

        <div className="flex items-center justify-between gap-3">
          <Logo />
          <div className="hidden md:block flex-1 max-w-[520px] mx-4">
            <Search />
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <Tooltip title="Compare">
              <IconButton size="small">
                <StyledBadge badgeContent={2}>
                  <MdCompare size={25} />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Wishlist">
              <IconButton size="small">
                <StyledBadge badgeContent={3}>
                  <IoHeartCircleOutline size={25} />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Cart">
              <Link to="/cart">
              <IconButton size="small">
                <StyledBadge badgeContent={1}>
                  <FaOpencart size={25} />
                </StyledBadge>
              </IconButton>
              </Link>
            </Tooltip>

            <Link to="/login" className="lg:hidden">
              <IconButton size="small">
                <PiUserCircleFill size={30} />
              </IconButton>
            </Link>

            <div className="hidden lg:flex items-center gap-2 ml-2">
              <Link to="/login" className="text-sm">Login</Link>
              <span className="text-[#8E8E8E]">|</span>
              <Link to="/register" className="text-sm">Register</Link>
            </div>

          </div>
        </div>
        <div className="mt-2 md:hidden">
          <Search />
        </div>

      </div>

    </header>
    </>
  );
}

export default Header;

