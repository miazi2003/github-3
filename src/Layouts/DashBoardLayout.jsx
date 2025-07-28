// components/TouristDashboardLayout.jsx
import { NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../hook/useAuth";


const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth() 
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (!loading && user?.role) {
      const role = "admin";

      if (role === "admin") {
        setLinks([
          { name: "Manage Profile", path: "/dashboard/profile" },
          { name: "Assigned Tours", path: "/dashboard/allTour" },
          { name: "Add Stories", path: "/dashboard/addStory" },
          { name: "Manage Stories", path: "/dashboard/manageStories" },
        ]);
      } else if (role === "guide") {
        setLinks([
          { name: "Manage Profile", path: "/dashboard/profile" },
          { name: "My Assigned Tours", path: "/dashboard/assigned-tours" },
          { name: "Add Stories", path: "/dashboard/addStory" },
          { name: "Manage Stories", path: "/dashboard/manageStories" },
        ]);
      } else {
        // tourist
        setLinks([
          { name: "Manage Profile", path: "/dashboard/profile" },
          { name: "My Bookings", path: "/dashboard/bookings" },
          { name: "Add Stories", path: "/dashboard/addStory" },
          { name: "Manage Stories", path: "/dashboard/manageStories" },
          { name: "Join as Tour Guide", path: "/dashboard/join-guide" },
        ]);
      }
    }
  }, [user, loading]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed z-30 md:static bg-white border-r border-gray-200 shadow-md md:shadow-none w-64 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b border-gray-100">
          {user?.role === "admin"
            ? "Admin Panel"
            : user?.role === "guide"
            ? "Guide Panel"
            : "Tourist Panel"}
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <footer className="mt-auto p-4 text-sm text-center text-gray-400 border-t border-gray-100">
          © 2025 TourApp
        </footer>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
        />
      )}

      {/* Toggle button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white p-2 rounded-md shadow"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64">
        <div className="bg-white rounded-xl shadow p-6 min-h-[80vh]">
          {loading ? <p>Loading...</p> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
