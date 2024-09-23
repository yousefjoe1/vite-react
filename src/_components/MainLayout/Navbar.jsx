import { useState, useEffect, useRef } from "react";
import { Menu, Search, ShoppingCart, User, ChevronDown } from "lucide-react";

export default function Component() {
  // State variables to manage different menu open/close states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDesktopShopMenuOpen, setIsDesktopShopMenuOpen] = useState(false);
  const [isMobileShopMenuOpen, setIsMobileShopMenuOpen] = useState(false);

  // Refs for detecting clicks outside of menus
  const profileMenuRef = useRef(null);
  const desktopShopMenuRef = useRef(null);

  // Toggle functions for different menus
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleDesktopShopMenu = () =>
    setIsDesktopShopMenuOpen(!isDesktopShopMenuOpen);
  const toggleMobileShopMenu = () =>
    setIsMobileShopMenuOpen(!isMobileShopMenuOpen);

  // Effect for handling clicks outside of menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile menu if clicked outside
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      // Close desktop shop menu if clicked outside
      if (
        desktopShopMenuRef.current &&
        !desktopShopMenuRef.current.contains(event.target)
      ) {
        setIsDesktopShopMenuOpen(false);
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow font-inter fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section: Mobile menu button, logo, and desktop menu items */}
            <div className="flex items-center">
              {/* Mobile menu toggle button */}
              <button
                className="lg:hidden p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              {/* Logo */}
              <a href="/" className="font-cairo font-bold text-xl">
                SHOP.CO
              </a>
              {/* Desktop menu items */}
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {/* Shop dropdown menu */}
                <div className="relative group" ref={desktopShopMenuRef}>
                  <button
                    className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                    onClick={toggleDesktopShopMenu}
                  >
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:text-indigo-600" />
                  </button>
                  {/* Shop dropdown content */}
                  {isDesktopShopMenuOpen && (
                    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <a
                        href="/shop/mens"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Men&apos;s Clothing
                      </a>
                      <a
                        href="/shop/womens"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Women&apos;s Clothing
                      </a>
                      <a
                        href="/shop/accessories"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Accessories
                      </a>
                      <a
                        href="/shop/shoes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        Shoes
                      </a>
                    </div>
                  )}
                </div>
                {/* Other menu items */}
                <a
                  href="/on-sale"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  On Sale
                </a>
                <a
                  href="/new-arrivals"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  New Arrivals
                </a>
                <a
                  href="/brands"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Brands
                </a>
              </div>
            </div>
            {/* Center section: Search bar (visible on large screens) */}
            <div className="hidden lg:flex flex-1 justify-center px-2">
              <div className="w-full max-w-lg">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                    placeholder="Search for products..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            {/* Right section: Mobile search, cart, and user profile */}
            <div className="flex items-center">
              {/* Mobile search button */}
              <button className="lg:hidden p-2" aria-label="Search">
                <Search className="h-6 w-6" />
              </button>
              {/* Shopping cart button */}
              <button
                className="p-2 relative hover:text-indigo-600 transition duration-150 ease-in-out"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  0
                </span>
              </button>
              {/* User profile menu */}
              <div className="relative ml-3" ref={profileMenuRef}>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out"
                  onClick={toggleProfileMenu}
                  aria-label="User menu"
                >
                  <User className="h-6 w-6 text-gray-600" />
                </button>
                {/* Profile dropdown content */}
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Account
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Orders
                    </a>
                    <a
                      href="/address"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Address
                    </a>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu (visible when isMobileMenuOpen is true) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Mobile Shop menu */}
              <div>
                <button
                  onClick={toggleMobileShopMenu}
                  className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-900 bg-gray-50 border-indigo-500 flex justify-between items-center w-full hover:bg-indigo-50 hover:text-indigo-600 transition duration-150 ease-in-out"
                >
                  Shop
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isMobileShopMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Mobile Shop dropdown content */}
                {isMobileShopMenuOpen && (
                  <div className="pl-4">
                    <a
                      href="/shop/mens"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Men&apos;s Clothing
                    </a>
                    <a
                      href="/shop/womens"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Women&apos;s Clothing
                    </a>
                    <a
                      href="/shop/accessories"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Accessories
                    </a>
                    <a
                      href="/shop/shoes"
                      className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
                    >
                      Shoes
                    </a>
                  </div>
                )}
              </div>
              {/* Other mobile menu items */}
              <a
                href="/on-sale"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                On Sale
              </a>
              <a
                href="/new-arrivals"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                New Arrivals
              </a>
              <a
                href="/brands"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition duration-150 ease-in-out"
              >
                Brands
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from being hidden behind the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
