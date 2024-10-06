import React, { useState } from "react";
import { colors } from "../categoriesData";

import { MdCheckCircleOutline } from "react-icons/md";
import { useSearchParams } from "react-router-dom";



const Colors = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [color, setColor] = useState('')

  const selectColor = (c) => {
    setColor(c)
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("color", c.toLowerCase());
    setSearchParams(newSearchParams);
   }


  return (
    <div className="grid grid-cols-4 gap-5 ">
      {colors.map((el, id) => (
        <button
          onClick={() => selectColor(el.name)}
          style={{ background: el.name }}
          key={id}
          className={`${color == el.name ? 'border-4': ''} transition-all ease-in-out duration-300 w-8 h-8 flex justify-center items-center rounded-full border-[1px]`}
        >
            {el.name == color ? <MdCheckCircleOutline color="green" />: ''}
          </button>
      ))}
    </div>
  );
};

export default Colors;
