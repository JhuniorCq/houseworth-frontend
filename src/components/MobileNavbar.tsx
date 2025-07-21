import { IoIosCloseCircle } from "react-icons/io";
import { NAVBAR_OPTIONS } from "../utils/constants";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface MobileNavbarProps {
  isNavbarOpen: boolean;
  handleNavbarMobile: () => void;
}

const MobileNavbar = ({
  isNavbarOpen,
  handleNavbarMobile,
}: MobileNavbarProps) => {
  const { logout } = useAuth();

  return (
    <nav
      className={`bg-ghost-white p-10 flex flex-col gap-5 fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
        isNavbarOpen ? "translate-x-0" : "translate-x-full"
      } min-[520px]:gap-8 min-[840px]:hidden`}
    >
      <IoIosCloseCircle
        className="self-end text-[28px] text-earth-strong transition-colors duration-300 ease-in-out hover:text-earth-very-strong cursor-pointer min-[520px]:text-4xl"
        onClick={handleNavbarMobile}
      />

      <ul className="h-full text-sm flex flex-col items-center gap-5 min-[520px]:gap-8">
        {NAVBAR_OPTIONS.map((o, i) => (
          <li key={i}>
            <NavLink
              to={o.path}
              className={({ isActive }) =>
                `font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-earth-very-strong pb-1 border-b-2 border-b-earth-strong"
                    : "text-gray-500/80"
                } min-[520px]:text-base`
              }
              onClick={handleNavbarMobile}
            >
              {o.name}
            </NavLink>
          </li>
        ))}
        <li className="mt-6">
          <button
            className="px-3 py-2 rounded-md bg-earth-strong transition-colors duration-300 ease-in-out hover:bg-earth-very-strong text-white font-semibold min-[520px]:text-base min-[520px]:px-4 min-[520px]:py-2.5"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
