import React, { useState } from "react";

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
import { basUrl } from "../../../_functions/getData";

const UpdateProduct = ({product,refetch}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState(product.name)
  const [details, setdetails] = useState(product.details)
  const [price, setPrice] = useState(product.price)
  const [discount, setDiscount] = useState(product.discount)
  const [rate, setRate] = useState(product.rate)
  const [category, setCategory] = useState(product.category)
  const [sub_category, setSub_category] = useState(product.sub_category)
  const [dress, setDress] = useState(product.dress)
  const [colors, setColors] = useState([product.colors[0],product.colors[1],product.colors[2]])
  const [sizes, setSizes] = useState([product.sizes[0],product.sizes[1],product.sizes[2]])
  const [images, setImages] = useState([product.images[0],product.images[1],product.images[2]])

  const update = async (second) => {
    let h = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1Njc4OSIsImVtYWlsIjoiYWRtaW4xMjN5b3Vzc2VmQGdtYWlsLmNvbSIsImlhdCI6MTcyNzgxMTIzN30.SuRjNdjjGmjPKLq_4bdwOHouPw59xzFAqLnBy8wu2WM`
      }
    }
    let d = {
      name: name,
      price: price,
      details: details,
      images: images,
      discount: discount,
      category: category,
      sub_category: sub_category,
      colors:colors,
      sizes: sizes,
      dress: dress,
      rate:rate
    }
    let res = await axios.patch(`${basUrl}/api/products/${product._id}`,d,h)
    console.log(res);
    refetch()
   }

  const handlePriceChange = (event) => {
    // Handle potential non-numeric input
    const parsedPrice = parseFloat(event.target.value);
    setPrice(isNaN(parsedPrice) ? price : parsedPrice); // Update only if valid number
  };

  // Update `colors` and `sizes` state arrays using spread syntax

  const handleColorChange = (index, event) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
  };

  const handleSizeChange   
 = (index, event) => {
    const newSizes = [...sizes];
    newSizes[index] = event.target.value;
    setSizes(newSizes);
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };
  
  return (
    <div>
      <>
        <Button color={'green'} bg={'silver'} onClick={onOpen}>update</Button>

        <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text mb='2px'>name</Text>
            <Input mb={3} type="text" value={name} onChange={(e)=> setName(e.target.value)}  />

            <Text mb='2px'>price</Text>
            <Input mb={3} type="number" value={price} onChange={(e)=> handlePriceChange(e.target.value)}  />

            <Text mb='2px'>Rate</Text>
            <Input mb={3} type="number" value={rate} onChange={(e)=> setRate(e.target.value)}  />

            <Text mb='2px'>discount</Text>
            <Input mb={3} type="number" value={discount} onChange={(e)=> setDiscount(e.target.value)}  />

            <Text mb='2px'>category</Text>
            <Input mb={3} type="text" value={category} onChange={(e)=> setCategory(e.target.value)}  />

            <Text mb='2px'>dress</Text>
            <Input mb={3} type="text" value={dress} onChange={(e)=> setDress(e.target.value)}  />

            <Text mb='2px'>sub category</Text>
            <Input mb={3} type="text" value={sub_category} onChange={(e)=> setSub_category(e.target.value)}  />

            <Text mb='2px'>details</Text>
            <Input mb={3} type="text" value={details} onChange={(e)=> setdetails(e.target.value)}  />

            <Text mb='2px'>colors</Text>
            <div className="flex justify-between gap-5">
                <Input  type="text" value={colors[0]} onChange={(e)=> handleColorChange(0,e)}/>
                <Input  type="text" value={colors[1]} onChange={(e)=> handleColorChange(1,e)} />
                <Input  type="text" value={colors[2]} onChange={(e)=> handleColorChange(2,e)} />
            </div>

            <Text my='2px'>sizes</Text>
            <div className="flex justify-between gap-5">
                <Input disabled type="text" value={sizes[0]} onChange={(e)=> setSizes()}/>
                <Input disabled type="text" value={sizes[1]} onChange={(e)=> setSizes()} />
                <Input disabled type="text" value={sizes[2]} onChange={(e)=> setSizes()} />
            </div>

            <Text my='2px'>images</Text>
            <div className="flex flex-col gap-5">
                <Input type="text" value={images[0]} onChange={(e)=> handleImageChange(0,e)}/>
                <Input type="text" value={images[1]} onChange={(e)=> handleImageChange(1,e)} />
                <Input type="text" value={images[2]} onChange={(e)=> handleImageChange(2,e)} />
            </div>





            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" mr={3} onClick={update}>
                update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default UpdateProduct;
