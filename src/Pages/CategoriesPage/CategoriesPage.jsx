import React from "react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { ChevronRightIcon } from "lucide-react";
import { MdFilterList } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { filter1 } from "./categoriesData";
import useFetch from "../../_hooks/useFetch";
import MySpinner from "../../_components/MainLayout/MySpinner";

const CategoriesPage = () => {
  const { data, isLoading, isError } = useFetch("products");
  const [searchParams] = useSearchParams();
  let categoryName = searchParams.get("category");
  //   console.log();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        spacing="8px"
        mt={4}
        separator={<ChevronRightIcon size={20} color="gray" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Casual</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex gap-5 mt-4">
        <div className="filters lg:block hidden p-4 w-[295px] border-2 rounded-2xl border-gray-400">
          <h3 className="flex justify-between items-center">
            <span>Filters</span>
            <span>
              <MdFilterList />
            </span>
          </h3>

          <hr className="mt-3" />

          <div className="categories mt-3">
            {filter1.map((el, id) => (
              <Link
                key={id}
                to={`/categories?category=${el.link}`}
                className="mt-5 flex justify-between items-center"
              >
                <span>{el.name}</span>
                <ChevronRightIcon size={20} color="gray" />
              </Link>
            ))}
          </div>
        </div>

        {isError || isLoading ? (
          <MySpinner />
        ) : (
          <div className="products">
            <h3 className="font-bold"> {categoryName} </h3>
            
            
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
