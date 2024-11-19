import { useContext } from "react";
import useFetch from "../../_hooks/useFetch";
import ContainerUp from "../../_components/ContainerUp";
import CartAndOrder from "./components/CartAndOrder";
import { MyContext } from "../../_context/conexts";
import MySpinner from "../../_components/MySpinner";
import { Link } from "react-router-dom";
import { ProductsCartObject } from "../../d";

interface Cart {
  code: number;
  msg: string;
}

interface Data {
  data: ProductsCartObject;
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  error: Error | null
}

const Cart = () => {
  const context = useContext(MyContext)!; // The `!` asserts that context is not undefined
  const { contextValue } = context;

  const {data,isError, isLoading,isRefetching} : Data  = useFetch(
    `cart`,
    "user-cart",
    contextValue,
    "userToken"
  );

  

  return (
    <ContainerUp className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm breadcrumbs mb-4">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>{" "}
          &gt;
          <span>Cart</span>
        </div>

        <h1 className="text-2xl font-bold mb-8">Your cart</h1>

        {isLoading ? (
          <MySpinner />
        ) : (
          <>
            {isRefetching ? (
              <MySpinner />
            ) : (
              <>
                {data?.data?.length == 0 || data.code == 400 ? (
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
                    alt="image"
                  />
                ) : (
                  <CartAndOrder
                    products={data}
                    status={{
                      isLoading: isLoading,
                      isRefetching: isRefetching,
                      isError: isError,
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </ContainerUp>
  );
};

export default Cart;
