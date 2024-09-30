import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { dress_style } from '../categoriesData'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'

const DressStyle = () => {
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
      <Link
        key={id}
        to={`/categories?category=${el.toLowerCase()}`}
        className="mt-5 flex justify-between items-center"
      >
        <span>{el}</span>
        <ChevronRightIcon size={20} color="gray" />
      </Link>
    ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default DressStyle