import React from "react";
import { FaEye, FaEdit } from "react-icons/fa";

const OrdersTable = () => {
  const orders = [
    {
      id: "10000007428",
      date: "2024-08-05 12:28:06",
      seller: "161.0000 SAR",
      price: "161.0000 SAR",
      status: "Canceled by the customer",
    },
    {
      id: "10000006296",
      date: "2024-06-30 14:29:25",
      seller: "8970.0000 SAR",
      price: "8970.0000 SAR",
      status: "Order processing",
    },
    {
      id: "10000005279",
      date: "2024-03-12 01:28:44",
      seller: "16.6497 SAR",
      price: "16.6497 SAR",
      status: "Order processing",
    },
    {
      id: "10000005727",
      date: "2024-03-12 01:24:55",
      seller: "15.8125 SAR",
      price: "15.8125 SAR",
      status: "Order processing",
    },
    {
      id: "10000005379",
      date: "2024-02-12 13:51:41",
      seller: "5086.6925 SAR",
      price: "5086.6925 SAR",
      status: "Pending",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Order number",
              "Order date",
              "Seller",
              "Price",
              "Order status",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.seller}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center">
                  {order.status}
                  <span
                    className={`ml-2 w-2 h-2 rounded-full ${
                      order.status === "Canceled by the customer"
                        ? "bg-red-500"
                        : order.status === "Order processing"
                        ? "bg-yellow-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-2">
                  <FaEye />
                </button>
                {order.status !== "Canceled by the customer" && (
                  <button className="text-blue-600 hover:text-blue-900">
                    <FaEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
