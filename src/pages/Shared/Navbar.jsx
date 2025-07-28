import { NavLink } from "react-router"; // use "react-router-dom" not "react-router"
import useAuth from "../../hook/useAuth";

// Active link styling
const navLinkClass = ({ isActive }) =>
  isActive
    ? "relative font-semibold text-purple-500 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3/5 after:h-[2px] after:bg-gradient-to-r after:from-purple-400 after:to-pink-500 after:rounded-full after:transition-all after:duration-300"
    : "relative hover:text-purple-400 transition-all duration-200";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  return (
    <div className="bg-base-200 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/community" className={navLinkClass}>
                    Community
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/allPackages" className={navLinkClass}>
                    Trips
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  About Us
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" className={navLinkClass}>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost text-xl flex items-center gap-2"
          >
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            ROAVIA
          </NavLink>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/community" className={navLinkClass}>
                  Community
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to="/allPackages" className={navLinkClass}>
                 Trips
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to="/dashBoard" className={navLinkClass}>
                 Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end space-x-2">
          {!user ? (
            <>
              <NavLink to="/signIn" >
                <button className="btn btn-dash">Sign In</button>
              </NavLink>
              <NavLink to="/signUp"><button className="btn btn-primary">Sign Up</button></NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64"
              >
                <li className="text-center font-bold">
                  <span>{user?.displayName || "User"}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </li>
              {
                user &&   <li>
                  <NavLink to="/guideForm" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                </li>
              }
                <li>
                  <NavLink to="/offers" className={navLinkClass}>
                    Offer Announcements
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={signOutUser}
                    className="btn btn-error btn-sm mt-2 w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
