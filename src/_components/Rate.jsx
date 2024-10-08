import React, { useMemo } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rate = ({ rate, size = "md", className = "" }) => {
  const iconSize = useMemo(() => {
    if (size === "sm") return 12;
    if (size === "lg") return 16;

    return 14;
  }, [size]);

  const floorRate = Math.floor(rate);

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        gap: iconSize / 2 + "px",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        if (index + 1 <= rate) {
          return <FaStar key={index} size={iconSize} />;
        } else if (index + 1 - rate <= 0.5) {
          return <FaStarHalfAlt key={index} size={iconSize}  />;
        } else {
          return <FaRegStar key={index} size={iconSize} />;
        }
      })}
    </div>
  );
};

export default Rate;