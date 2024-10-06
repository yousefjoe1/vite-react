import React, { useState } from "react";

import { ChevronRightIcon } from "lucide-react";

import { categories } from "../categoriesData";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState("");

  const selectCategory = (c) => {
    setCategory(c);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", c.toLowerCase());
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <div className="categories mt-3">
        {categories.map((el, id) => (
          <button
            onClick={() => selectCategory(el.link)}
            key={id}
            className={`${category == el.link ? 'bg-slate-100':''} mt-5 flex justify-between w-full items-center`}
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
