import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { TbHandClick } from "react-icons/tb";

import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";

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
import ContainerUp from "../../_components/ContainerUp";

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  let minPrice = searchParams.get("minPrice");
  let maxPrice = searchParams.get("maxPrice");
  let dress = searchParams.get("dress");
  let color = searchParams.get("color");
  let size = searchParams.get("size");
  let category = searchParams.get("category");

  const { data, isLoading, isError, isRefetching, refetch } = useFetch(
    `products?${newSearchParams}`,
    "pr-categ"
  );

  console.log(data);

  const setFilter = () => {
    let u = `dress=${dress == null ? "casual" : dress}${
      minPrice != undefined ? `&minPrice=${minPrice}` : ""
    }${maxPrice != undefined ? `&maxPrice=${maxPrice}` : ""}${
      color != undefined ? `&color=${color}` : ""
    }${size != undefined ? `&size=${size}` : ""}${
      category != undefined ? `&category=${category}` : ""
    }`;
    const newSearchParams = new URLSearchParams(u);
    setSearchParams(newSearchParams);
    refetch();
    document.body.scrollIntoView({ behavior: "smooth" });
  };

  const resetFilter = async () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("dress", "casual");
    document.body.scrollIntoView({ behavior: "smooth" });
    await setSearchParams(newSearchParams);
    refetch();
    document.body.scrollIntoView();
  };

  return (
    <ContainerUp className="max-w-7xl pb-16 mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        spacing="8px"
        mt={4}
        separator={<ChevronRightIcon size={20} color="gray" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="capitalize">
            {dress}
          </BreadcrumbLink>
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
          <Categories />

          <hr className="my-3" />

          <h3 className="font-bold">Price</h3>
          <PriceRange />

          <hr className="my-3" />

          <Colors />

          <hr className="my-3" />

          <Sizes />

          <hr className="my-3" />

          <DressStyle />

          <button
            onClick={setFilter}
            className="bg-black rounded-3xl mt-3 text-white p-2 w-[99%] mx-auto "
          >
            Applay Filter
          </button>
        </div>

        <FilterMobile refetch={refetch} />

        {isRefetching && (
          <div className="fixed top-1  z-50 bg-slate-400/80 h-12 border-b-2 w-full flex justify-center items-center p-4 rounded-3xl">
            <MySpinner s="lg" />
          </div>
        )}

        {isError || isLoading ? (
          <MySpinner />
        ) : (
          <div className="products w-full">
            <h3 className="flex mb-10 gap-3 items-center lg:justify-between">
              <span className="lg:text-2xl text-lg font-bold">{dress}</span>
              <span className="text-sm">Showing 1-10 of 100 Products</span>
            </h3>

            {data?.data?.length == 0 ? (
              <div className="flex items-center gap-4">
                <Button disabled={isRefetching == true ? true: false} onClick={resetFilter}>Get All <TbHandClick />  </Button>
                <Badge variant="solid" colorScheme="red">
                  No products found
                </Badge>
              </div>
            ) : (
              ""
            )}

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
              {data?.data?.map((prod) => (
                <Product prod={prod} key={prod._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ContainerUp>
  );
};

export default CategoriesPage;
