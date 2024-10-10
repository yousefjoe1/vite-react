import React from "react";
import { FaClipboardCheck, FaBan, FaClock } from "react-icons/fa";

const OrderStatusCards = () => {
  const statusCards = [
    {
      icon: FaClipboardCheck,
      title: "Completed orders",
      count: "0 order",
      color: "bg-green-600",
    },
    {
      icon: FaBan,
      title: "Canceled orders",
      count: "1 order",
      color: "bg-red-500",
    },
    {
      icon: FaClock,
      title: "Processing orders",
      count: "3 order",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="flex space-x-4 mb-6">
      {statusCards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} p-4 rounded-md shadow-sm text-white flex-1`}
        >
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-md mr-3">
              <card.icon
                className={`text-2xl ${card.color.replace("bg-", "text-")}`}
              />
            </div>
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-lg font-bold">{card.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusCards;
