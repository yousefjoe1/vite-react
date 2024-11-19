import useFetch from "../../../_hooks/useFetch";

import AddProduct from "../components/AddProduct";
import { ProductInfo } from "../../../d";
import MySpinner from "../../../_components/MySpinner";
import { useState } from "react";
import UpdateProduct from "../../../_components/Products/UpdateProduct";

const AdminHome = () => {
  const [count, setCount] = useState(1000)
  const { data, isLoading, refetch } = useFetch(
    `admin/products?count=${count}`,
    "product-admin",true,'adminToken'
  );
  
  console.log("🚀 ~ AdminHome ~ data:", data)
  
  if (isLoading) {
    return (
      <>
        <MySpinner />
      </>
    );
  }  

  return (
    <div className="p-5 container mx-auto">
      <AddProduct refetch={refetch} />

      <div className="grid grid-cols-1 gap-10">
        {data?.data?.map((el:ProductInfo) => (
          <div key={el._id} className="bg-white-200 rounded-2xl shadow-lg p-4">
            <div className="imgs flex justify-center flex-wrap gap-5">
              <img
                width={200}
                height={200}
                className="object-cover"
                loading="lazy"
                src={el.images[0]}
                alt={el.images[0]}
              />
              <img
                width={200}
                height={200}
                className="object-cover"
                loading="lazy"
                src={el.images[1]}
                alt={el.images[1]}
              />
              <img
                width={200}
                height={200}
                className="object-cover"
                loading="lazy"
                src={el.images[2]}
                alt={el.images[2]}
              />
            </div>

            <div className="name">name: {el.name} </div>
            <div className="price">price: {el.price} </div>
            <div className="category">category: {el.category} </div>
            <div className="sub-category">sub category: {el.sub_category} </div>
            <div className="dress">dress style: {el.dress} </div>
            <div className="colors">colors: {el.colors.map((c,i)=> <span key={i}>{c}  </span>)} </div>
            <div className="sizes">sizes: {el.sizes.map((s,i)=> <span key={i}>{s}  </span>)} </div>
            <div className="details">details: {el.details} </div>


            {/* update */}
            <UpdateProduct token="adminToken" product={el} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
