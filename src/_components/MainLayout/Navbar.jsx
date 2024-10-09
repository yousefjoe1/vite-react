import { useState, useEffect, useRef, useContext } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  X,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../../_hooks/useFetch";
import { useQuery } from "@chakra-ui/react";
import { basUrl } from "../../_functions/getData";
import axios from "axios";
import MySpinner from "./MySpinner";
import { MyContext } from "../../_context/conexts";

const Navbar = () => {
  const { contextValue, setContextValue } = useContext(MyContext);
  console.log(contextValue);

  const { data, isLoading, isError,isRefetching} = useFetch(
    `cart`,
    "cart-name",
    contextValue,
    "userToken"
  );
  console.log(data, "cart");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const shopMenuRef = useRef(null);
  const searchRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleShopMenu = () => setIsShopMenuOpen(!isShopMenuOpen);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  const handleLogin = () => {
    window.location.href = "/auth?mode=login";
    setIsProfileMenuOpen(false);
  };

  const handleRegister = () => {
    window.location.href = "/auth?mode=register";
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <nav className="bg-white shadow font-inter fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="lg:hidden p-2" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="font-cairo font-bold text-xl">
                SHOP.CO
              </Link>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                <div className="relative group" ref={shopMenuRef}>
                  <button
                    className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                    onClick={toggleShopMenu}
                  >
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:text-indigo-600" />
                  </button>
                  {isShopMenuOpen && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to="/shop/mens"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Men&apos;s Clothing
                      </Link>
                      <Link
                        to="/shop/womens"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Women&apos;s Clothing
                      </Link>
                      <Link
                        to="/shop/accessories"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Accessories
                      </Link>
                      <Link
                        to="/shop/shoes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Shoes
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/on-sale"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  On Sale
                </Link>
                <Link
                  to="/new-arrivals"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  New Arrivals
                </Link>
                <Link
                  to="/brands"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Brands
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex flex-1 justify-center px-2">
              <div className="w-full max-w-lg">
                <label htmlFor="desktop-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="desktop-search"
                    name="desktop-search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                    placeholder="Search for products..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="lg:hidden" ref={searchRef}>
                {isSearchExpanded ? (
                  <div className="fixed inset-0 z-50 bg-white p-4">
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <button
                        onClick={toggleSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="p-2" onClick={toggleSearch}>
                    <Search className="h-6 w-6" />
                  </button>
                )}
              </div>
              <Link
                to={`/cart`}
                className="p-2 relative hover:text-indigo-600 transition duration-150 ease-in-out"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {isLoading || isRefetching ? (
                    <MySpinner s="sm" />
                  ) : (
                    <>{isError ? 0 : <>{data?.data?.length}</>}</>
                  )}
                </span>
              </Link>
              <div className="relative ml-3" ref={profileMenuRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out"
                  onClick={toggleProfileMenu}
                >
                  {isLoggedIn ? (
                    <User className="h-6 w-6 text-gray-600" />
                  ) : (
                    <LogIn className="h-6 w-6 text-gray-600" />
                  )}
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Account
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Orders
                        </Link>
                        <Link
                          to="/address"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Address
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={"auth?mode=login"}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Login
                        </Link>
                        <Link
                          to={`auth?mode=register`}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden" ref={menuRef}>
            <div className="pt-2 pb-3 space-y-1">
              <div>
                <button
                  onClick={toggleShopMenu}
                  className=" pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-900 bg-gray-50 border-indigo-500 flex justify-between items-center w-full hover:bg-indigo-50 hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Shop
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isShopMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isShopMenuOpen && (
                  <div className="pl-4">
                    <Link
                      to="/shop/mens"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Men&apos;s Clothing
                    </Link>
                    <Link
                      to="/shop/womens"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Women&apos;s Clothing
                    </Link>
                    <Link
                      to="/shop/accessories"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Accessories
                    </Link>
                    <Link
                      to="/shop/shoes"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Shoes
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/on-sale"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                On Sale
              </Link>
              <Link
                to="/new-arrivals"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                New Arrivals
              </Link>
              <Link
                to="/brands"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                Brands
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
