import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import images from "../../assets/images";
import useAuthContext from "../../Hooks/useAuthContext";
import { Contexts } from "../../Context/Context";
import { LayoutDashboard,BookPlus } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { LogOut } = useAuthContext(Contexts);
  const location = useLocation(); // ✅ useLocation হুক ব্যবহার করা হয়েছে

  const navLinks = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/promo-code", label: "Promo Code", icon: BookPlus },
  ];

  return (
    <div className="flex flex-col dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 h-16 border-b border-slate-200 dark:border-gray-700 flex items-center px-4 shadow-sm">
        <button
          className="p-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle navigation"
        >
          <div className="w-6 flex flex-col gap-1">
            <span className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transform transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transition-all duration-300 ${isSidebarOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-slate-900 dark:bg-white transform transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>

        <Link to="/">
          <img src={images?.image?.logo || "/placeholder.svg"} alt="logo" className="h-12" />
        </Link>
      </header>

      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 fixed top-0 h-screen w-64 transform transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-gray-700 z-40 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo Section */}
        <div className="h-24 border-b border-slate-200 dark:border-gray-700 flex items-center justify-center px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={images?.image?.logo || "/placeholder.svg"} alt="logo" className="h-20" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="py-6 flex-1">
          <ul className="space-y-2">
          {navLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-[#f98c25] dark:text-[#f98b25d7] font-semibold bg-red-50 dark:bg-red-900/20"
                        : "text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Bottom Buttons Section */}
        <div className="border-t border-slate-200 dark:border-gray-700 p-4 space-y-3">
          {/* Logout Button */}
          <button
            onClick={LogOut}
            className="inline-flex w-full h-12 items-center justify-center gap-2 rounded-full bg-[#f98c25] dark:bg-[#f98c25] px-6 text-sm font-medium text-white transition duration-300 hover:bg-[#d8a16d] dark:hover:bg-red-900/30"
          >
            <span className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#c5c5c563] dark:bg-black/50 bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
