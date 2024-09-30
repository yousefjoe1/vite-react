import React from "react";
import { Link } from "react-router-dom";

import PriceRange from "./PriceRange";
import Colors from "./Colors";
import Sizes from "./Sizes";

import DressStyle from "./DressStyle";

import { ChevronRightIcon } from "lucide-react";
import { MdFilterList } from "react-icons/md";
import { GoFilter } from "react-icons/go";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { categories } from "../categoriesData";

const FilterMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef(null);
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
                <div className="filters-mobile p-3 rounded-2xl border-gray-400">
                    <h3 className="flex justify-between items-center">
                    <span>Filters</span>
                    <span>
                        <MdFilterList />
                    </span>
                    </h3>

                    <hr className="mt-3" />

                    <div className="categories mt-3">
                    {categories.map((el, id) => (
                        <Link
                        key={id}
                        to={`/categories?category=${el.link}`}
                        className="mt-5 flex justify-between items-center"
                        >
                        <span>{el.name}</span>
                        <ChevronRightIcon size={20} color="gray" />
                        </Link>
                    ))}
                    </div>

                    <hr className="my-3" />

                    <h3 className="font-bold">Price</h3>
                    <PriceRange />

                    <hr className="my-3" />

                    <Colors />

                    <hr className="my-3" />

                    <Sizes />

                    <hr className="my-3" />

                    <DressStyle />
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
