import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { sizes } from "../categoriesData";
import { useSearchParams } from "react-router-dom";

const Sizes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [size, setsize] = useState('')

  const selectColor = (c) => {
    setsize(c)
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("size", c.toLowerCase());
    setSearchParams(newSearchParams);
   }


  return (
    <Accordion allowToggle>
      <AccordionItem className="border-none">
        <h2>
          <AccordionButton px={0}>
            <Box as="span" flex="1" textAlign="left">
              Size
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0} className="flex flex-wrap gap-2">
          {sizes.map((el, id) => (
            <button
            onClick={()=> selectColor(el)}
              key={id}
              className={`${el == size ? 'bg-black text-white': '#F0F0F0'}
              p-2 rounded-2xl flex justify-between items-center`}
            >
              <span>{el}</span>
            </button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Sizes;
