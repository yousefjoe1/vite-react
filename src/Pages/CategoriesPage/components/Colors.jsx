import React, { useState } from "react";
import { colors } from "../categoriesData";

import { MdCheckCircleOutline } from "react-icons/md";



const Colors = ({setFilter}) => {

  const [color, setColor] = useState('')

  const selectColor = (c) => {
    setColor(c)
    setFilter(c)
   }


  return (
    <div className="grid grid-cols-4 gap-5 ">
      {colors.map((el, id) => (
        <button
          onClick={() => selectColor(el.name)}
          style={{ background: el.name }}
          key={id}
          className={`w-8 h-8 flex justify-center items-center rounded-full border-[1px] `}
        >
            {el.name == color ? <MdCheckCircleOutline color="green" />: ''}
          </button>
      ))}
    </div>
  );
};

export default Colors;
