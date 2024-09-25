import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logout } from "../store/userSlice";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-cyan-500 via-sky-600 to-sky-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-white">
          HangoutHub
        </Link>
        {/* Hamburger Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 animate-pulse" />
          ) : (
            <Bars3Icon className="w-6 h-6 animate-pulse" />
          )}
        </button>
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/events" className="nav-link hover:text-white">
            Events
          </Link>
          {userInfo && (
            <Link to="/dashboard" className="nav-link hover:text-white">
              Dashboard
            </Link>
          )}
          {userInfo ? (
            <button
              onClick={handleLogout}
              className="nav-link hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link hover:text-white">
              Login
            </Link>
          )}
        </nav>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white animate-slideDown">
          <Link
            to="/events"
            className="mobile-nav-link hover:bg-primary hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          {userInfo && (
            <Link
              to="/dashboard"
              className="mobile-nav-link hover:bg-primary hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {userInfo ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="mobile-nav-link hover:bg-primary hover:text-white text-left w-full"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-nav-link hover:bg-primary hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
