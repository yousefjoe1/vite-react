import { Link } from "react-router-dom";

export const logedItems = [
    {
      label: (
        <Link
          to="/account"
          className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
        >
          Account
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          to="/orders"
          className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
        >
          Orders
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          to="/address"
          className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
        >
          Address
        </Link>
      ),
      key: "2",
    },
  ];
  
 export const notLogedItems = [
    // {
    //   label: (
    //     <Link
    //       to={"/auth?mode=login"}
    //       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
    //     >
    //       Login
    //     </Link>
    //   ),
    //   key: "0",
    // },
    {
      label: (
        <Link
          to={`/auth?mode=register`}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
        >
          Register
        </Link>
      ),
      key: "1",
    },
  ];