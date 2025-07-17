import { NavLink } from "react-router-dom";
import { NAVBAR_OPTIONS } from "../utils/constants";

const Navbar = () => {
  return (
    <nav className="hidden min-[840px]:block">
      <ul className="text-sm flex items-center gap-6">
        {NAVBAR_OPTIONS.map((o, i) => (
          <li key={i}>
            <NavLink
              to={o.path}
              className={({ isActive }) =>
                `font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-earth-very-strong pb-1 border-b-2 border-b-earth-strong"
                    : "text-gray-500/80"
                }`
              }
            >
              {o.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
