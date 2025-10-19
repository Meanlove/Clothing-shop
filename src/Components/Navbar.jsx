import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { getWishlistItemsCount } = useWishlist();

  // Auto-search when search term changes and we're on all-collections page
  useEffect(() => {
    if (location.pathname === "/all-collections" && searchTerm.trim()) {
      const timer = setTimeout(() => {
        navigate(
          `/all-collections?search=${encodeURIComponent(searchTerm.trim())}`,
          { replace: true }
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, location.pathname, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/all-collections?search=${encodeURIComponent(searchTerm.trim())}`
      );
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };

  // Clear search when navigating away from all-collections
  useEffect(() => {
    if (location.pathname !== "/all-collections") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* ✅ Left: Logo & Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover group-hover:border-amber-500 transition-colors duration-300"
                src="https://i.pinimg.com/1200x/7a/bf/2c/7abf2ca43b62487de9aa4cfc62686e84.jpg"
                alt="Fashion Store Logo"
              />
              <div className="absolute inset-0 rounded-full bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors duration-300"></div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent">
              CLOTHING SHOP
            </span>
          </NavLink>

          {/* <div className="hidden lg:flex items-center space-x-1">
            <NavLink
              className={({ isActive }) =>
                `transition-all duration-300 px-4 py-2 rounded-xl  font-medium relative group
                  ${
                    isActive
                      ? "text-amber-600 font-semibold bg-amber-50 border border-amber-200"
                      : "text-gray-600 hover:text-amber-700"
                  }`
              }
              to="/"
            >
              Home
            </NavLink>
          </div> */}
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { path: "/", label: "Home" },
              { path: "/men", label: "Men" },
              { path: "/women", label: "Women" },
              { path: "/all-collections", label: "All Collections" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300 font-medium relative overflow-hidden group
        ${
          isActive
            ? "text-amber-600 font-semibold bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm"
            : "text-gray-600 hover:text-amber-700"
        }`
                }
              >
                {/* Hover background effect */}
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></span>

                {/* Active state indicator */}
                {({ isActive }) =>
                  isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  )
                }
              </NavLink>
            ))}
          </div>
        </div>

        {/* ✅ Middle: Search Bar */}
        <div
          className={`flex-1 max-w-lg mx-8 transition-all duration-500 ${
            isSearchOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 lg:opacity-100 lg:scale-100"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50/80 backdrop-blur-sm  rounded-2xl pl-5 pr-12 py-3 text-sm border border-gray-200/80 outline-none transition-all duration-300 focus:bg-white focus:border-amber-300 focus:ring-4 focus:ring-amber-100 focus:shadow-lg placeholder-gray-500"
            />
            {/* Clear Button - Shows when there's text */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-amber-500 transition-colors duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-amber-500 transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* ✅ Right: Actions */}
        <div className="flex items-center space-x-6">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Wishlist Icon */}
          <div className="relative group">
            <NavLink
              to="/wishlist"
              className="p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 relative flex items-center hover:scale-105 active:scale-95"
            >
              <FaHeart className="w-5 h-5" />

              {/* Wishlist Count Badge */}
              {getWishlistItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {getWishlistItemsCount()}
                </span>
              )}
            </NavLink>

            {/* Wishlist tooltip */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <p className="text-sm text-gray-600 font-medium">
                {getWishlistItemsCount()} items in wishlist
              </p>
              <div className="mt-1 bg-pink-50 rounded-lg p-2">
                <p className="text-xs text-pink-700">
                  Save your favorite items!
                </p>
              </div>
            </div>
          </div>

          {/* Cart with badge */}
          <div className="relative group">
            <NavLink
              to="/cart"
              className="p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 relative flex items-center hover:scale-105 active:scale-95"
            >
              {/* Cart Icon from Font Awesome */}
              <i className="fa-solid fa-cart-shopping text-lg"></i>

              {/* Cart Count Badge */}
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {getCartItemsCount()}
                </span>
              )}
            </NavLink>
            {/* Cart tooltip */}
            <div className="absolute top-full right-2 mt-2 w-50 bg-white rounded-xl shadow-lg border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <p className="text-sm text-gray-600 font-medium">
                {getCartItemsCount()} items in cart
              </p>
              <div className=" bg-amber-50 rounded-lg p-2">
                <p className="text-xs text-amber-700">
                  Free shipping on all orders!
                </p>
              </div>
            </div>
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-6 py-2 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group shadow-lg
      ${
        isActive
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl scale-105"
          : "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 hover:shadow-xl hover:scale-105 active:scale-95"
      }`
              }
            >
              {/* Shine effect */}
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

              {/* Active state indicator */}
              {({ isActive }) =>
                isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></span>
                )
              }
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-6 py-2 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group shadow-lg
      ${
        isActive
          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl scale-105"
          : "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 hover:shadow-xl hover:scale-105 active:scale-95"
      }`
              }
            >
              {/* Shine effect */}
              <span className="relative z-10">Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

              {/* Active state indicator */}
              {({ isActive }) =>
                isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></span>
                )
              }
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-gray-100 mt-3 pt-3 px-6">
        <div className="flex items-center justify-around">
          {["men", "women", "all-collections"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium
                ${
                  isActive
                    ? "text-amber-600 font-semibold bg-amber-50"
                    : "text-gray-600 hover:text-amber-700"
                }`
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
