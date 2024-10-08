import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useFetch from "../../_hooks/useFetch";
import MySpinner from "../../_components/MainLayout/MySpinner";
import { basUrl } from "../../_functions/getData";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import CartProduct from "../../_components/Cards/CartProduct";
import ContainerUp from "../../_components/ContainerUp";

const Cart = () => {
  let msg = useToast();

  const [isSubmit, setIsSubmit] = useState(false);
  const { data, isLoading, isError,error, refetch, isRefetching } = useFetch(
    `cart`,
    "user-cart",
    false,
    "userToken"
  );
  console.log(data);

  return (
    <ContainerUp className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm breadcrumbs mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          &gt;
          <span>Cart</span>
        </div>

        <h1 className="text-2xl font-bold mb-8">Your cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white relative rounded-lg shadow-sm border p-4">
              {isRefetching && (
                <div className="absolute flex justify-center items-center top-0 left-0 w-full bg-black/10 h-full">
                  <MySpinner />
                </div>
              )}
              {isError || isLoading ? (
                <div className="flex">
                <MySpinner />
                {isError && <>{error}</>}
                </div>
              ) : (
                <>
                  {data?.data?.map((item) => {
                    let { product } = item;
                    return (
                      <CartProduct
                      key={item._id}
                        product={product}
                        item={item}
                        refetch={refetch}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          {isLoading ? (
            <MySpinner />
          ) : (
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between mb-2 text-red-500">
                  <span>Discount (-20%)</span>
                  <span>-$100</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${data?.total?.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-full mt-6 hover:bg-gray-800 transition duration-300">
                  Go to Checkout →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ContainerUp>
  );
};

export default Cart;
