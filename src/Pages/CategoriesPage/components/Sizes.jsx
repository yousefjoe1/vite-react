import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const Sizes = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem className="border-none">
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Size
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {/* {sizes.map((el, id) => (
            <Link
              key={id}
              to={`/categories?category=${el}`}
              className="mt-5 flex justify-between items-center"
            >
              <span>{el}</span>
            </Link>
          ))} */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Sizes;
