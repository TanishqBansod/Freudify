import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hamburgerIcon from "./hamburgericon.png";
import { useAuth } from "./AuthContext";

function NavBar({ userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to the home/dashboard page if authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 p-3 bg-cyan-950 flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-white" onClick={toggleMenu}>
            <img src={hamburgerIcon} alt="Hamburger icon" className="w-6 h-6" />
          </button>
          <h1
            className={`text-white ml-4 text-lg font-semibold ${
              isOpen ? "transform translate-x-4" : ""
            }`}
          >
            {userName}
          </h1>
        </div>
        <div className="text-white">
          <span className="font-semibold text-xl">Freudify</span>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <button className="text-white p-4" onClick={toggleMenu}>
          <img src={hamburgerIcon} alt="Close icon" className="w-6 h-6" />
        </button>
        <nav className="mt-4">
        <Link
  to="/home"
  className="block py-2 px-4 text-teal-200 hover:text-white"
  onClick={toggleMenu}
>
  Dream Analyzer
</Link>
          <Link
            to="/login"
            className="block py-2 px-4 text-teal-200 hover:text-white"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block py-2 px-4 text-teal-200 hover:text-white"
            onClick={toggleMenu}
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="block py-2 px-4 text-teal-200 hover:text-white"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/home"
            className="block py-2 px-4 text-teal-200 hover:text-white"
            onClick={toggleMenu}
          >
            Login
          </Link>
          {isAuthenticated && (
            <button
              className="block py-2 px-4 text-teal-200 hover:text-white text-left"
              onClick={() => {
                logout();
                toggleMenu();
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

export default NavBar;
