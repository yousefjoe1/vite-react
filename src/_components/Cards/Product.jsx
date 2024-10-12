import React from "react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import Rate from "../Rate";
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

const Product = ({prod}) => {
  return (
    <>
      <Link to={`/product/${prod._id}`} className="lg:max-w-[295px]">
      <div className="block h-64 overflow-hidden">
              <img
                src={prod.images[0]}
                alt={prod.name}
                className="w-full h-full lg:object-cover object-contain rounded-3xl"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{prod.name}</h3>
              {/* <StarRating rating={3} /> */}
              <Rate rate={prod.rate} />
              <div className="mt-2">
                <span className="font-bold text-lg">${prod.price}</span>
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
    </>
  );
};

export default Product;
