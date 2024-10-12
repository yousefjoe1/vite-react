import React from "react";

import Sidebar from "./Sidebar";
import OrderStatusCards from "./OrderStatusCards";
import OrdersTable from "./OrdersTable";
import Pagination from "./Pagination";

const OrdersPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <Breadcrumb />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h1 className="text-xl font-bold mb-6">Dashboard</h1>
          <OrderStatusCards />
          <h2 className="text-lg font-medium my-4">All orders</h2>
          <OrdersTable />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

const Breadcrumb = () => (
  <div className="text-sm breadcrumbs mb-4">
    <ul className="flex">
      <li className="text-gray-500">Dashboard</li>
      <li className="text-gray-500 before:content-['>'] before:mx-2">Orders</li>
    </ul>
  </div>
);

export default OrdersPage;