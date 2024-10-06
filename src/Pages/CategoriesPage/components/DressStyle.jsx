import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { dress_style } from "../categoriesData";
import { useSearchParams } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

const DressStyle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const [dressStyle, setDressStyle] = useState("");

  const selectDress = (d) => {
    setDressStyle(d);
    newSearchParams.set("dress", d.toLowerCase());
    setSearchParams(newSearchParams);
  };
  return (
    <Accordion allowToggle>
      <AccordionItem className="border-none">
        <h2>
          <AccordionButton px={0}>
            <Box as="span" flex="1" textAlign="left">
              Dress Style
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          {dress_style.map((el, id) => (
            <button
              onClick={() => selectDress(el)}
              key={id}
              className={`${dressStyle == el ? 'bg-slate-100': ''} mt-5 flex justify-between items-center w-full transition-all ease-in-out duration-300`}
            >
              <span>{el}</span>
              <ChevronRightIcon size={20} color="gray" />
            </button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyle;
