import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = ["Orders", "Address", "Account", "Logout"];

  return (
    <div className="w-64 bg-white shadow-md rounded-2xl self-start m-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-4">Dashboard</h2>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <span
                className={
                  index === 0 ? "text-gray-800 font-medium" : "text-gray-500"
                }
              >
                {item}
              </span>
              <FaChevronRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
