import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";

const Searching = () => {
  const searchRef = useRef(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  return (
    <>
      <div className="search-div lg:hidden" ref={searchRef}>
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
    </>
  );
};

export default Searching;
