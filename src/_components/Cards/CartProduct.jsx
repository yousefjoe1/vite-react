import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { debounce } from 'lodash';
import MySpinner from "../MainLayout/MySpinner";

import { FiTrash2 } from "react-icons/fi";
import { useToast } from "@chakra-ui/react";

import { basUrl } from "../../_functions/getData";
import { MyContext } from "../../_context/conexts";

const CartProduct = ({ product, item,handleItem }) => {
  console.log(product);
  
  const { contextValue, setContextValue } = useContext(MyContext);

  let msg = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const [productCount, setProductCount] = useState(parseInt(item.count));

  const handleProductCount = (t) => {
    if (t == "-") {
      if (productCount > 1) {
        setProductCount(productCount - 1);
        handleItem(product,'-')
      }
    } else {
      setProductCount(productCount + 1);
      handleItem(product,'+')
    }
    // debouncedUpdateCart()
  };

  const removeItem = async (id) => {
    let tk = localStorage.getItem("userToken");

    if (!tk) {
      msg({ title: `You have to login `, status: "warning", duration: 3000 });
      return;
    }

    let h = {
      headers: {
        Authorization: `Bearer ${tk}`,
      },
    };
    setIsSubmit(true);
    try {
      let res = await axios.delete(`${basUrl}/api/cart/${id}`, h);
      setIsSubmit(false);
      setContextValue(!contextValue);
      return;
      msg({ title: res.data.msg, status: "info", duration: 3000 });
      if (res.data.in_cart) {
        return;
      } else {
        msg({ title: res.data.msg, status: "success", duration: 3000 });
        setIsSubmit(false);
        setContextValue(!contextValue);
      }
    } catch (er) {
      console.log(er);
      setIsSubmit(false);
    }
    // setCartItems(cartIt/ems.filter((item) => item.id !== id));
  };


  // const updateCart = async () => {
  //   const tk = localStorage.getItem('userToken');

  //   if (!tk) {
  //     msg({ title: `You have to login`, status: 'warning', duration: 3000 });
  //     return;
  //   }

  //   const h = {
  //     headers: {
  //       Authorization: `Bearer ${tk}`
  //     }
  //   };

  //   let {name,_id,discount,price,images} = product
  //   let d = {
  //     product: {name,_id,img:images[0],discount,color:selectedColor,size:selectedSize,price},
  //     count: productCount
  //   }

  //   try {
  //     const res = await axios.put(`${basUrl}/api/cart/${_id}`, d, h);
  //     console.log(res);
      
  //     if (res.data.in_cart) {
  //       msg({ title: res.data.msg, status: 'info', duration: 3000 });
  //       return;
  //     } else {
  //       msg({ title: res.data.msg, status: 'success', duration: 3000 });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Debounce the updateCart function
  // const debouncedUpdateCart = useCallback(debounce(updateCart, 1000), [productCount]);
  return (
    <div
      key={product._id}
      className="flex products-center py-4 border-b last:border-b-0"
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-xs text-gray-500">Size: {product.size}</p>
        <p className="text-xs text-gray-500">Color: {product.color}</p>
        <p className="font-bold mt-1">${product.price}</p>
      </div>
      <div className="flex products-center justify-end">
        <div className="delete flex flex-col items-end justify-between">
          <button
            disabled={isSubmit}
            onClick={() => removeItem(item._id)}
            className="ml-4 text-red-500"
          >
            {isSubmit ? <MySpinner s="sm" /> : <FiTrash2 />}
          </button>
          <div className="flex justify-between bg-[#F0F0F0] w-[125px] px-3 p-1 rounded-2xl">
            <button
              onClick={() => handleProductCount("-")}
              className="flex products-center justify-center"
            >
              -
            </button>
            <span className="mx-2">{productCount}</span>
            <button
              onClick={() => handleProductCount("+")}
              className="flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
