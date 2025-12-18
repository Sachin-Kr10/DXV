import { Link } from "react-router";
import logo from "../../assets/logo/1.jpg";
import Search from "../search";
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

function Header() {
  return (
    <header className="bg-[#FFFFFF] border-b border-[#E5E5E5]">
      <div className="hidden md:block bg-[#0B0B0B] text-[#F7F7F7] text-[13px] py-2">
        <div className="container flex justify-between items-center">
          <p>Get up to 50% off new season styles</p>
          <ul className="flex gap-4">
            <li>
              <Link className="hover:text-[#C9A24D]" to="/help-center">
                Help
              </Link>
            </li>
            <li>
              <Link className="hover:text-[#C9A24D]" to="/order-tracking">
                Track Order
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container py-3 flex items-center justify-between flex-nowrap gap-3">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="
    font-['Playfair_Display']
    text-[20px] sm:text-[22px] lg:text-[26px]
    tracking-[0.18em] sm:tracking-[0.25em] lg:tracking-[0.3em]
    text-[#0B0B0B]
    whitespace-nowrap
    select-none
  "
          >
            <span>D</span>
            <span className="mx-1 text-[#C9A24D]">X</span>
            <span>V</span>
          </Link>
        </div>

        <div className="flex-1 min-w-0 max-w-[520px]">
          <Search />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-2">
            <Link className="link text-sm" to="/login">
              Login
            </Link>
            <span className="text-[#8E8E8E]">|</span>
            <Link className="link text-sm" to="/register">
              Register
            </Link>
          </div>

          <Tooltip title="Compare">
            <IconButton size="small">
              <StyledBadge badgeContent={2}>
                <MdCompare size={18} />
              </StyledBadge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Wishlist">
            <IconButton size="small">
              <StyledBadge badgeContent={3}>
                <IoHeartCircleOutline size={20} />
              </StyledBadge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Cart">
            <IconButton size="small">
              <StyledBadge badgeContent={1}>
                <FaOpencart size={18} />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Link
            to="/login"
            className="lg:hidden flex items-center justify-center 
            text-[#0B0B0B] hover:text-[#C9A24D] transition-colors">
            <Tooltip title="Login/Register">
              <IconButton size="small">
                <PiUserCircleFill size={22} />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
