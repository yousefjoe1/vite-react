import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../../_functions/getData";
import { ProductInfo } from "../../../d";
import useMsg from "../../../_hooks/useMsg";
import MySpinner from "../../../_components/MySpinner";

const UpdateProduct = ({
  product,
  refetch,
}: {
  product: ProductInfo;
  refetch: Function;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmit, setIsSubmit] = useState(false);

  let {msg} = useMsg()

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
    setIsSubmit(true)
    let res = await axios.patch(`${baseUrl}/api/products/${product._id}`, d, h);
    setIsSubmit(false)
    if(res.data.code == 400){
      msg(res.data.msg, "error");
    }else{
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
        <Button color={"green"} bg={"silver"} onClick={onOpen}>
          update
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="2px">name</Text>
              <Input
                mb={3}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Text mb="2px">price</Text>
              <Input
                mb={3}
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
              />

              <Text mb="2px">Rate</Text>
              <Input
                mb={3}
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />

              <Text mb="2px">discount</Text>
              <Input
                mb={3}
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

              <Text mb="2px">category</Text>
              <Input
                mb={3}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Text mb="2px">dress</Text>
              <Input
                mb={3}
                type="text"
                value={dress}
                onChange={(e) => setDress(e.target.value)}
              />

              <Text mb="2px">sub category</Text>
              <Input
                mb={3}
                type="text"
                value={sub_category}
                onChange={(e) => setSub_category(e.target.value)}
              />

              <Text mb="2px">details</Text>
              <Input
                mb={3}
                type="text"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
              />

              <Text mb="2px">colors</Text>
              <div className="flex justify-between gap-5">
                <Input
                  type="text"
                  value={colors[0]}
                  onChange={(e) => handleColorChange(0, e)}
                />
                <Input
                  type="text"
                  value={colors[1]}
                  onChange={(e) => handleColorChange(1, e)}
                />
                <Input
                  type="text"
                  value={colors[2]}
                  onChange={(e) => handleColorChange(2, e)}
                />
              </div>

              <Text my="2px">sizes</Text>
              <div className="flex justify-between gap-5">
                <Input
                  disabled
                  type="text"
                  value={sizes[0]}
                  onChange={(e) => {}}
                />
                <Input
                  disabled
                  type="text"
                  value={sizes[1]}
                  onChange={(e) => {}}
                />
                <Input
                  disabled
                  type="text"
                  value={sizes[2]}
                  onChange={(e) => {}}
                />
              </div>

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
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
              _hover={''}
              variant={`outline`}
                className={`${isSubmit ?`bg-green-200/45`: `bg-green-500 text-white`}`}
                // colorScheme="green"
                mr={3}
                disabled={isSubmit}
                onClick={update}
              >
                update
                {isSubmit && <MySpinner s="sm" />}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default UpdateProduct;
