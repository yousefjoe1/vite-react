import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { ChevronRightIcon } from "lucide-react";
import { MdFilterList } from "react-icons/md";

import useFetch from "../../_hooks/useFetch";
import MySpinner from "../../_components/MainLayout/MySpinner";

import Sizes from "./components/Sizes";
import PriceRange from "./components/PriceRange";
import Colors from "./components/Colors";
import DressStyle from "./components/DressStyle";
import Categories from "./components/Categories";

import FilterMobile from "./components/FilterMobile";
import Product from "../../_components/Cards/Product";

const CategoriesPage = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  console.log(newSearchParams,'sp');
  

  useEffect(() => {
    document.body.scrollIntoView();
  }, []);
  
  let { current: category } = useRef();
  let { current: minPrice } = useRef();
  let { current: maxPrice } = useRef();
  let { current: color } = useRef();
  let { current: size } = useRef();
  
  let dressName = searchParams.get("dress");
  let {dress,color:c,size:s} = searchParams.get("dress");

  const { data, isLoading, isError } = useFetch(`products?${newSearchParams}`, 'pr-categ' ,[dressName,newSearchParams.size,c,s]);
  console.log(data);
  
  const setFilter = () => {
    console.log(minPrice,
      maxPrice,
      color,
      size,);
    
    let dressName = searchParams.get("dress");
     let u = `dress=${dressName}${minPrice != undefined ?`&minPrice=${minPrice}`: ''}${maxPrice != undefined ?`&maxPrice=${maxPrice}`: ''}${color != undefined ? `&color=${color}`:''}${size != undefined ? `&size=${size}`: ''}`;
    const newSearchParams = new URLSearchParams(u);
    setSearchParams(newSearchParams);
  };


  const handlePrice = (name, value) => {
    if (name == "min") {
      minPrice = value;
    } else {
      maxPrice = value;
    }
  };

  return (
    <div className="max-w-7xl pb-16 mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        spacing="8px"
        mt={4}
        separator={<ChevronRightIcon size={20} color="gray" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="capitalize">{dressName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex lg:flex-row flex-row-reverse justify-between gap-5 mt-4">
        <div className="filters lg:block hidden p-4 w-[295px] border-2 rounded-2xl border-gray-400">
          <h3 className="flex justify-between items-center">
            <span>Filters</span>
            <span>
              <MdFilterList />
            </span>
          </h3>

          <hr className="mt-3" />
          <Categories selectSubCategory={(c) => (category = c)} />

          <hr className="my-3" />

          <h3 className="font-bold">Price</h3>
          <PriceRange handlePrice={handlePrice} />

          <hr className="my-3" />

          <Colors setFilter={(c) => (color = c)} />

          <hr className="my-3" />

          <Sizes selectSize={(s) => (size = s)} />

          <hr className="my-3" />

          <DressStyle />

          <button
            onClick={setFilter}
            className="bg-black rounded-3xl mt-3 text-white p-2 w-[99%] mx-auto "
          >
            Applay Filter
          </button>
        </div>

        <FilterMobile />

        {isError || isLoading ? (
          <MySpinner />
        ) : (
          <div className="products w-full">
            <h3 className="flex mb-10 gap-3 items-center lg:justify-between">
              <span className="lg:text-2xl text-lg font-bold">
                {dressName}
              </span>
              <span className="text-sm">Showing 1-10 of 100 Products</span>
            </h3>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
              {data?.data?.map((prod) => (
                <Product prod={prod} key={prod._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
