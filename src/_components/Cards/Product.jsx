import React from "react";
import { Link } from "react-router-dom";

const Product = ({prod}) => {
  return (
    <>
      <Link to={`/product/${prod._id}`} className="lg:w-[295px]">
        <div className="img-div lg:h-[298px] mx-auto ">
          <img
            src={prod.images[0]}
            className="w-full rounded-2xl object-cover h-full"
            alt="product image"
          />
        </div>

        <h3></h3>

        <h3> {prod.name} </h3>

        <h3> {prod.price} </h3>
      </Link>
    </>
  );
};

export default Product;
