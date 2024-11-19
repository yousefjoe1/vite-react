import { useState } from "react";

import { Button, Modal } from "antd";

import { Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../../_functions/getData";
import { ProductInfo } from "../../../d";
import useMsg from "../../../_hooks/useMsg";
import MySpinner from "../../../_components/MySpinner";
import Selections from "./Selections";
import {
  allCategories,
  allDress,
  allSubCateg,
  allColors,
  allSizes,
} from "../../../_constants/AddProductsData";
import MultiSelections from "./MultiSelections";

const UpdateProduct = ({
  product,
  refetch,
}: {
  product: ProductInfo;
  refetch: Function;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isSubmit, setIsSubmit] = useState(false);

  let { msg } = useMsg();

  const [name, setName] = useState(product.name);
  const [details, setdetails] = useState(product.details);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState<string | number>(product.discount);
  const [rate, setRate] = useState(product.rate);
  const [category, setCategory] = useState(product.category);
  const [sub_category, setSub_category] = useState(product.sub_category);
  const [dress, setDress] = useState(product.dress);
  const [colors, setColors] = useState([
    product.colors[0],
    product.colors[1],
    product.colors[2],
  ]);
  const [sizes, setSizes] = useState([
    product.sizes[0],
    product.sizes[1],
    product.sizes[2],
  ]);
  const [images, setImages] = useState([
    product.images[0],
    product.images[1],
    product.images[2],
  ]);

  const update = async () => {
    let h = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
      },
    };
    let d = {
      name: name,
      price: price,
      details: details,
      images: images,
      discount: discount,
      category: category,
      sub_category: sub_category,
      colors: colors,
      sizes: sizes,
      dress: dress,
      rate: rate,
    };
    setIsSubmit(true);
    let res = await axios.patch(`${baseUrl}/api/products/${product._id}`, d, h);
    setIsSubmit(false);
    if (res.data.code == 400) {
      msg(res.data.msg, "error");
    } else {
      msg(res.data.msg);
    }
    console.log(res);
    refetch();
  };

  const handlePriceChange = (event: string) => {
    // Handle potential non-numeric input
    const parsedPrice = parseFloat(event);
    setPrice(isNaN(parsedPrice) ? price : parsedPrice); // Update only if valid number
  };

  // Update `colors` and `sizes` state arrays using spread syntax

  const handleColorChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
  };

  const handleSizeChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSizes = [...sizes];
    newSizes[index] = event.target.value;
    setSizes(newSizes);
  };

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  return (
    <div>
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
        footer={[
          <Button
          // _hover={''}
          // variant={`outline`}
            className={`${isSubmit ?`bg-green-200/45`: `bg-green-500 text-white`}`}
            // mr={3}
            disabled={isSubmit}
            onClick={update}
          >
            update
            {isSubmit && <MySpinner s="sm" />}
          </Button>
        ]}
          title="Basic Modal"
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
            <div>
              <Text mb="2px">name</Text>
              <Input
                mb={3}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Text mb="2px">price</Text>
              <Input
                mb={3}
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
              />
            </div>

            <div>
              <Text mb="2px">Rate</Text>
              <Input
                mb={3}
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div>
              <Text mb="2px">discount</Text>
              <Input
                mb={3}
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-3 relative">
            <div>
              <Text mb="2px">category</Text>
              <Selections
                firstValue={category}
                values={allCategories}
                assignValue={(e: string) => setCategory(e)}
              />
            </div>
            <div>
              <Text mb="2px">dress style</Text>
              <Selections
                firstValue={dress}
                values={allDress}
                assignValue={(e: string) => setDress(e)}
              />
            </div>

            <div>
              <Text mb="2px">sub category</Text>
              <Selections
                firstValue={sub_category}
                values={allSubCateg}
                assignValue={(e: string) => setSub_category(e)}
              />
            </div>

            <div>
              <Text mb="2px">Colors</Text>
              <MultiSelections
                values={allColors}
                assignValue={(v: string[]) => setColors(v)}
              />
            </div>

            <div>
              <Text mb="2px">Sizes</Text>
              <MultiSelections
                values={allSizes}
                assignValue={(v: string[]) => setSizes(v)}
              />
            </div>
          </div>
        </Modal>
        {/* <Button color={"green"} bg={"silver"} onClick={onOpen}>
          update
        </Button> */}
        {/* 
        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody> */}

        {/* <Text mb="2px">details</Text>
              <Input
                mb={3}
                type="text"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
              />

              <Text my="2px">images</Text>
              <div className="flex flex-col gap-5">
                <Input
                  type="text"
                  value={images[0]}
                  onChange={(e) => handleImageChange(0, e)}
                />
                <Input
                  type="text"
                  value={images[1]}
                  onChange={(e) => handleImageChange(1, e)}
                />
                <Input
                  type="text"
                  value={images[2]}
                  onChange={(e) => handleImageChange(2, e)}
                />
              </div> */}
        {/* </ModalBody> */}

        {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
              _hover={''}
              variant={`outline`}
                className={`${isSubmit ?`bg-green-200/45`: `bg-green-500 text-white`}`}
                mr={3}
                disabled={isSubmit}
                onClick={update}
              >
                update
                {isSubmit && <MySpinner s="sm" />}
              </Button>
            </ModalFooter> */}
        {/* </ModalContent>
        </Modal> */}
      </>
    </div>
  );
};

export default UpdateProduct;
