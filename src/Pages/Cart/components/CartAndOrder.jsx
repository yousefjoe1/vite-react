import React, { useState } from "react";
import MySpinner from "../../../_components/MainLayout/MySpinner";
import CartProduct from "../../../_components/Cards/CartProduct";
import { Link } from "react-router-dom";

const CartAndOrder = ({ producuts, status }) => {
  const [cartData, setcartData] = useState(producuts);
  
  const { total,data } = cartData;

  let subTotal = data.map(it=> it.product.discount).reduce((accumulator, current) => accumulator + current, 0);

  let finalPrice = total - subTotal * total /100
  
  let { isLoading, isRefetching, isError } = status;

  const handleItem = (item, operator) => {
    let d = total ;
    if(operator == '-'){
        d -= item.price
    }else{
        d  += item.price
    }
    let c = {...cartData,total:d}
    setcartData(p=> c)
  };


  let t = total - finalPrice

  return (
    <div>
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
                {isError && <>Error </>}
              </div>
            ) : (
              <></>
            )}
            {cartData?.data?.map((item) => {
              let { product } = item;
              return (
                <CartProduct
                  key={item._id}
                  product={product}
                  item={item}
                  handleItem={handleItem}
                />
              );
            })}
          </div>
        </div>

        {/* <OrderSummary data={data} cartDetails={data} /> */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-2 text-red-500">
              <span>Discount (-{subTotal}%)</span>
              <span>-${t}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>$15</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${finalPrice}</span>
            </div>
            <Link to={`/checkout`} className="w-full block text-center bg-black text-white py-3 rounded-full mt-6 hover:bg-gray-800 transition duration-300">
              Go to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAndOrder;
