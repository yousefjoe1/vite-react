import React, { useState } from "react";

import { ChevronRightIcon } from "lucide-react";

import { categories } from "../categoriesData";
import { useSearchParams } from "react-router-dom";

const Categories = ({ selectSubCategory }) => {
  const [searchParams,setSearchParams] = useSearchParams();

  const [category, setCategory] = useState("");

  const selectCategory = (c) => {
    setCategory(c);
    selectSubCategory(c);
    const newSearchParams = new URLSearchParams(searchParams);

  // Set the 'type' parameter to 'men'
  newSearchParams.set('category', c.toLowerCase());

  // Update the URL with the new query parameters
  setSearchParams(newSearchParams);
  };

  return (
    <>
      <div className="categories mt-3">
        {categories.map((el, id) => (
          <button
            onClick={()=> selectCategory(el.link)}
            key={id}
            className="mt-5 flex justify-between items-center"
          >
            <span>{el.name}</span>
            <ChevronRightIcon size={20} color="gray" />
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;
