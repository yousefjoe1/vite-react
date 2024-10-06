import React, { useState } from "react";

import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const PriceRange = ({handlePrice}) => {
  const [searchParams,setSearchParams] = useSearchParams();

  const [rangeValues, setRangeValues] = useState([100, 400]);

  const handleRangeChange = (values) => {
    setRangeValues(values);
    handlePrice('min',values[0])
    handlePrice('max',values[1])
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
