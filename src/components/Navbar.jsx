import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
   <nav className="bg-black text-white px-6 py-4 shadow-lg sticky top-0 z-50 backdrop-blur-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* 🌍 Brand */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent hover:scale-110 transition duration-300"
        >
          UrbanMitra
        </Link>

        {/* ☰ Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>

        {/* Links (Desktop) */}
        <div className="hidden sm:flex gap-6 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
              >
                👋 {user.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white/90 text-gray-800 rounded-lg shadow-xl overflow-hidden">
                  <Link
                    to="/report"
                    className="block px-4 py-2 text-sm hover:bg-cyan-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📝 Report Issue
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-cyan-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-full shadow-md transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-full shadow-md transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Links (Mobile) */}
      {menuOpen && (
        <div className="sm:hidden mt-3 space-y-2">
          {user ? (
            <div ref={dropdownRef} className="space-y-2 bg-white/10 rounded-lg p-3">
              <Link
                to="/report"
                className="block text-white hover:text-cyan-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                📝 Report Issue
              </Link>
              <Link
                to="/profile"
                className="block text-white hover:text-cyan-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-400 hover:text-red-500 transition"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
