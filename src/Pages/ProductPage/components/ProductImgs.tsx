import React, { useState } from "react";
import MySpinner from "../../../_components/MySpinner";

const ProductImgs = ({imgs = []}) => {
  

  const [mainImage, setMainImage] = useState(imgs[0]);
  // console.log(imgs);

  if(!imgs){

    return <MySpinner />
  }
  
  return (
    <>
      <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 flex lg:flex-row flex-col lg:items-start items-center">
        <div className="lg:w-1/5 mr-4">
          <div className="flex lg:flex-col flex-row gap-x-3 mb-2 space-y-2">
            {imgs.map((img, index) => (
              <div
                key={index}
                className={`w-full aspect-square lg:mx-0 mx-auto cursor-pointer overflow-hidden rounded-lg ${
                  index === mainImage
                    ? "ring-2 ring-black"
                    : "ring-1 ring-gray-200"
                }`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-4/5">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={mainImage}
              alt={'product image'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductImgs;
