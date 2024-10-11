import React, { useContext } from "react";
import useFetch from "../../_hooks/useFetch";
import MySpinner from "../../_components/MainLayout/MySpinner";
import ContainerUp from "../../_components/ContainerUp";
import CartAndOrder from "./components/CartAndOrder";
import { MyContext } from "../../_context/conexts";

const Cart = () => {
  const { contextValue } = useContext(MyContext);

  const { data, isLoading, isError, isRefetching } = useFetch(`cart`, "user-cart", contextValue, "userToken");

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

        {isLoading  ? (
          <MySpinner />
        ) : (
          <>
          {
            isRefetching ? <MySpinner />:

          <CartAndOrder
          producuts={data}
          status={{
            loading: isLoading,
            isRefetching: isRefetching,
            isError: isError,
          }}
          />
        }
          </>
        )}
      </div>
    </ContainerUp>
  );
};

export default Cart;
