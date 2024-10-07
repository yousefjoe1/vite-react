import React from "react";
import useFetch from "../../../_hooks/useFetch";
import MySpinner from "../../../_components/MainLayout/MySpinner";
import Product from "../../../_components/Cards/Product";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-gray-600">{rating}/5</span>
    </div>
  );
};

const NewArrival = ({ title }) => {
  const { data, isLoading, isError } = useFetch(
    `products?count=4`,
    "p-by-count"
  );

  return (
    <div className="p-4 md:p-8 container mx-auto">
      <h3 className="font-bold text-center text-4xl mb-5">{title}</h3>
      {/* {isLoading ? (
        <MySpinner />
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {data?.data?.map((prod) => (
            <Product prod={prod} key={prod._id} />
          ))}
        </div>
      )} */}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((product, index) => (
          <Link
          to={`/product/${product._id}`} 
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="block h-64 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full lg:object-cover object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <StarRating rating={3} />
              <div className="mt-2">
                <span className="font-bold text-lg">${product.price}</span>
                {/* {product.originalPrice && (
                      <>
                        <span className="text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                        <span className="text-red-500 ml-2">
                          -{product.discount}%
                        </span>
                      </>
                    )} */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          mx={"auto"}
          colorScheme="#0000001A"
          w={215}
          rounded={"3xl"}
          variant="outline"
        >
          View more
        </Button>
      </div>
    </div>
  );
};

export default NewArrival;
