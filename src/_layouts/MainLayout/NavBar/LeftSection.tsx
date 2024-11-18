import { Link } from "react-router-dom";
import ShopMenu from "./ShopMenu";
import LeftLinks from "./LeftLinks";

const LeftSection = () => {
  return (
    <div className="flex items-center gap-1">
      <LeftLinks />
      <Link to="/" className="font-cairo font-bold text-xl">
        SHOP.CO
      </Link>
      <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
        <div className="relative group">
          <ShopMenu />
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
  );
};

export default LeftSection;
