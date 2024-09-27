import React from "react";

import {
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
  } from "@chakra-ui/react";

const PriceRange = () => {
  return (
    <>
      <RangeSlider
        aria-label={["min", "max"]}
        colorScheme="gray"
        defaultValue={[10, 30]}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </>
  );
};

export default PriceRange;
