import React from "react";
import { colors } from "../categoriesData";

const Colors = () => {
  return (
    <div className="grid grid-cols-4 gap-5 ">
      {colors.map((el, id) => (
        <button
          onClick={() => {}}
          style={{ background: el.name }}
          key={id}
          className={`w-8 h-8 rounded-full `}
        />
      ))}
    </div>
  );
};

export default Colors;
