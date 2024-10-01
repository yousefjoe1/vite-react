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

const UpdateProduct = ({product}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(product);

  const [name, setname] = useState(product.name)
  const [details, setdetails] = useState(product.details)
  const [price, setprice] = useState(product.price)
  const [category, setCategory] = useState(product.category)
  const [dress, setdress] = useState(product.dress)
  const [colors, setColors] = useState([product.colors[0],product.colors[1],product.colors[2]])
  const [sizes, setSizes] = useState([product.sizes[0],product.sizes[1],product.sizes[2]])
  const [images, setimages] = useState([product.images[0],product.images[1],product.images[2]])

  const update = async (second) => {
    let h = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1Njc4OSIsImVtYWlsIjoiYWRtaW4xMjN5b3Vzc2VmQGdtYWlsLmNvbSIsImlhdCI6MTcyNzgxMTIzN30.SuRjNdjjGmjPKLq_4bdwOHouPw59xzFAqLnBy8wu2WM`
      }
    }
    let d = {
      name: req.body.name,
      price: req.body.price,
      details: req.body.details,
      images: req.body.images,
      discount: req.body.discount,
      main_category:req.body.main_category,
      sub_category:req.body.sub_category,
      colors:req.body.colors,
      sizes: req.body.sizes,
    }
    let res = await axios.post(`${basUrl}/api/products`,d,h)
    console.log(res);
    
   }
  
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
            <Input mb={3} type="text" value={name} onChange={(e)=> setname(e.target.value)}  />

            <Text mb='2px'>price</Text>
            <Input mb={3} type="number" value={price} onChange={(e)=> setprice(e.target.value)}  />

            <Text mb='2px'>category</Text>
            <Input mb={3} type="text" value={category} onChange={(e)=> setCategory(e.target.value)}  />

            <Text mb='2px'>dress</Text>
            <Input mb={3} type="text" value={dress} onChange={(e)=> setdress(e.target.value)}  />

            <Text mb='2px'>details</Text>
            <Input mb={3} type="text" value={details} onChange={(e)=> setdetails(e.target.value)}  />

            <Text mb='2px'>colors</Text>
            <div className="flex justify-between gap-5">
                <Input disabled type="text" value={colors[0]} onChange={(e)=> setColors()}/>
                <Input disabled type="text" value={colors[1]} onChange={(e)=> setColors()} />
                <Input disabled type="text" value={colors[2]} onChange={(e)=> setColors()} />
            </div>

            <Text my='2px'>sizes</Text>
            <div className="flex justify-between gap-5">
                <Input disabled type="text" value={sizes[0]} onChange={(e)=> setSizes()}/>
                <Input disabled type="text" value={sizes[1]} onChange={(e)=> setSizes()} />
                <Input disabled type="text" value={sizes[2]} onChange={(e)=> setSizes()} />
            </div>

            <Text my='2px'>images</Text>
            <div className="flex flex-col gap-5">
                <Input type="text" value={images[0]} onChange={(e)=> setimages()}/>
                <Input type="text" value={images[1]} onChange={(e)=> setimages()} />
                <Input type="text" value={images[2]} onChange={(e)=> setimages()} />
            </div>





            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default UpdateProduct;
