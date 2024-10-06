import React, { useState } from "react";

import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const PriceRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const [rangeValues, setRangeValues] = useState([100, 400]);

  const handleRangeChange = (values) => {
    setRangeValues(values);
    newSearchParams.set("minPrice", values[0]);
    newSearchParams.set("maxPrice", values[1]);
    setSearchParams(newSearchParams);
  };
  // console.log(rangeValues);

  return (
    <>
      <RangeSlider
        aria-label={["min", "max"]}
        colorScheme="gray"
        defaultValue={rangeValues}
        min={100} // Set the minimum value
        max={400} // Set the maximum value
        onChange={handleRangeChange}
        step={50}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      <div className="flex justify-around">
        <span> ${rangeValues[0]} </span>
        <span> ${rangeValues[1]} </span>
      </div>
    </>
  );
};

export default PriceRange;
