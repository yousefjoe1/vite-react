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

const FilterMobile = ({refetch}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const btnRef = React.useRef(null)
  const newSearchParams = new URLSearchParams(searchParams);

  let minPrice = searchParams.get("minPrice");
  let maxPrice = searchParams.get("maxPrice");
  let dress = searchParams.get("dress");
  let color = searchParams.get("color");
  let size = searchParams.get("size");
  let category = searchParams.get("category");

  const setFilter = () => {
    let u = `dress=${dress == null ? "casual" : dress}${
      minPrice != undefined ? `&minPrice=${minPrice}` : ""
    }${maxPrice != undefined ? `&maxPrice=${maxPrice}` : ""}${
      color != undefined ? `&color=${color}` : ""
    }${size != undefined ? `&size=${size}` : ""}${
      category != undefined ? `&category=${category}` : ""
    }`;
    const newSearchParams = new URLSearchParams(u);
    setSearchParams(newSearchParams);
    refetch();
    document.body.scrollIntoView({ behavior: "smooth" });
  };

  const resetFilter = async () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("dress", "casual");
    document.body.scrollIntoView({ behavior: "smooth" });
    setSearchParams(newSearchParams);
    refetch();
    document.body.scrollIntoView();
  };
  return (
    <div className="absolute right-5">
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
          <Categories />

          <hr className="my-3" />

          <h3 className="font-bold">Price</h3>
          <PriceRange />

          <hr className="my-3" />

          <Colors />

          <hr className="my-3" />

          <Sizes />

          <hr className="my-3" />

          {/* main categoreis */}
          <DressStyle />

          <button
            onClick={setFilter}
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
