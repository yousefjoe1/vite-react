import React from "react";
import { orders } from "./ordersData";
import { ChevronRightIcon } from "lucide-react";
import ContainerUp from "../../_components/ContainerUp";

const OrdersPage = () => {
  return (
    <ContainerUp className="flex container mx-auto">
      <div className="mt-5 w-[295px] border-2 rounded-2xl border-gray-400 p-4">
        {orders.map((el, id) => (
          <button
            key={id}
            className={`flex mt-3 justify-between items-center w-full`}
          >
            <span>{el}</span>
            <ChevronRightIcon size={20} color="gray" />
          </button>
        ))}
      <hr className="mt-3" />
      <button className={`flex mt-3 justify-between items-center w-full`}>
        <span>Logout</span>
        <ChevronRightIcon size={20} color="gray" />
      </button>
      </div>
    </ContainerUp>
  );
};

export default OrdersPage;
