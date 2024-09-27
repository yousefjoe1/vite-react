import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { sizes } from "../categoriesData";

const Sizes = ({selectSize,sizeValue}) => {
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
              key={id}
              className={`bg-[${el == sizeValue ? 'black': '#F0F0F0'}] p-2 rounded-2xl flex justify-between items-center`}
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
