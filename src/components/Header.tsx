import { FaHouse } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  const { appUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const goToHome = () => {
    navigate("/home");
  };

  const handleNavbarMobile = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="px-8 h-14 flex gap-2 items-center justify-between shadow z-10">
        <div className="flex items-center gap-10">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={goToHome}
          >
            <FaHouse className="shrink-0 text-earth-strong" />
            <span className="font-semibold">HouseWorth</span>
          </div>

          <Navbar />
        </div>

        <div className="flex items-center gap-4">
          <IoIosMenu
            className="text-lg text-earth-very-strong cursor-pointer min-[840px]:hidden"
            onClick={handleNavbarMobile}
          />
          <span className="text-gray-500/80 font-medium text-sm hidden min-[840px]:block">
            Bienvenido, {appUser?.username}
          </span>
          <MdOutlineLogout
            className="shrink-0 text-earth-strong cursor-pointer hidden min-[840px]:block"
            onClick={logout}
          />
        </div>
      </header>
      <MobileNavbar
        isNavbarOpen={isNavbarOpen}
        handleNavbarMobile={handleNavbarMobile}
      />
    </>
  );
};

export default Header;
