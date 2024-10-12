import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button className="px-4 py-2 border rounded text-sm text-gray-600 bg-white">
        ← Previous
      </button>
      <div className="flex space-x-2">
        {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-blue-500 text-white" : "bg-white text-gray-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="px-4 py-2 border rounded text-sm text-gray-600 bg-white">
        Next →
      </button>
    </div>
  );
};

export default Pagination;
