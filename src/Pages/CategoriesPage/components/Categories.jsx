import React, { useState } from "react";

import { ChevronRightIcon } from "lucide-react";

import { categories } from "../categoriesData";

const Categories = ({ selectSubCategory }) => {
  const [category, setCategory] = useState("");

  const selectCategory = (c) => {
    setCategory(c);
    selectSubCategory(c);
  };

  return (
    <>
      <div className="categories mt-3">
        {categories.map((el, id) => (
          <button
            onClick={()=> selectCategory(el.name)}
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
