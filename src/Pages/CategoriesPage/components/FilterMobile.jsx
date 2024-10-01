import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import PriceRange from "./PriceRange";
import Colors from "./Colors";
import Sizes from "./Sizes";

import DressStyle from "./DressStyle";

import { MdFilterList } from "react-icons/md";
import { GoFilter } from "react-icons/go";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Categories from "./Categories";

const FilterMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();

  const btnRef = React.useRef(null);

  let {current: category} = useRef()
  let {current: minPrice} = useRef();
  let {current: maxPrice} = useRef();
  let {current: color} = useRef();
  let {current: size} = useRef();


  const setFilter = (name, value) => {
    let u = `category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${color}&size=${size}`
    console.log(u,'categ');
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    console.log(newSearchParams);
    
    // setSearchParams(newSearchParams);
  };

  const applayFilter = (second) => {
    setFilter()
  };

  const handlePrice = (name, value) => {
    if(name == 'min'){
      minPrice = value
    }else {
      maxPrice = value
    }
  };
  return (
    <div>
      <button className="lg:hidden block" mt={0} ref={btnRef} onClick={onOpen}>
      <GoFilter size={25} />
      </button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={"outside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={15} /> */}
            <div className="filters p-4 rounded-2xl border-gray-400">
          <h3 className="flex justify-between items-center">
            <span>Filters</span>
            <span>
              <MdFilterList />
            </span>
          </h3>

          <hr className="mt-3" />
          {/* sub categoreis */}
          <Categories selectSubCategory={(c)=> category = c} />

          <hr className="my-3" />

          <h3 className="font-bold">Price</h3>
          <PriceRange handlePrice={handlePrice} />

          <hr className="my-3" />

          <Colors setFilter={(c)=> color = c} />

          <hr className="my-3" />

          <Sizes  selectSize={(s)=> size = s}/>

          <hr className="my-3" />

          {/* main categoreis */}
          <DressStyle />

          <button
            onClick={applayFilter}
            className="bg-black rounded-3xl mt-3 text-white p-2 w-[99%] mx-auto "
          >
            Applay Filter
          </button>
        </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={onClose}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default FilterMobile;
