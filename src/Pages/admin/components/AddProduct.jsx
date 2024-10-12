import React, { useState } from "react";

import { Button, Input, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { basUrl } from "../../../_functions/getData";
import MySpinner from "../../../_components/MainLayout/MySpinner";

let dressvalue = ["casual", "formal", "party", "gym"];
let subvalues = ["men", "women", "shoes", "accessories"];
let categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const AddProduct = ({ refetch }) => {
  let msg = useToast();
  const [submit, setsubmit] = useState(false);

  const [name, setName] = useState("");
  const [details, setdetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [sub_category, setSub_category] = useState("");
  const [dress, setDress] = useState("");
  const [colors, setColors] = useState([
    "black",
    "gray",
    "white",
    "green",
    "blue",
  ]);
  const [sizes, setSizes] = useState(["Small", "Medium", "Large", "X-Large"]);
  const [images, setImages] = useState([]);

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

  const handleSizeChange = (index, event) => {
    const newSizes = [...sizes];
    newSizes[index] = event.target.value;
    setSizes(newSizes);
  };

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const AddProduct = async (second) => {
    setsubmit((p) => true);
    let h = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEyMzQ1Njc4OSIsImVtYWlsIjoiYWRtaW4xMjN5b3Vzc2VmQGdtYWlsLmNvbSIsImlhdCI6MTcyNzgxMTIzN30.SuRjNdjjGmjPKLq_4bdwOHouPw59xzFAqLnBy8wu2WM`,
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
    };

    let res = await axios.post(`${basUrl}/api/products`, d, h);
    if (res.data.code == 301) {
      setsubmit((p) => false);
      msg({ title: "wrong", status: "error", duration: 3000 });
    } else {
      setsubmit((p) => false);
      msg({ title: "good job", status: "success", duration: 3000 });
      refetch();
    }
  };
  return (
    <>
      {submit ? (
        <MySpinner />
      ) : (
        <div className="w-[700px] mx-auto border-2 shadow-sm rounded-2xl p-7 mb-5">
          <div className="grid gap-4 grid-cols-3">
            <div className="">
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
                onChange={(e) => setPrice(e.target.value)}
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

          <div className="grid gap-5 grid-cols-3">
            <div>
              <Text mb="2px">category</Text>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                mb={4}
                placeholder="Select option"
              >
                {categories.map((ctg) => (
                  <option key={ctg} value={ctg}>
                    {ctg}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Text mb="2px">dress</Text>
              <Select
                onChange={(e) => setDress(e.target.value)}
                mb={4}
                placeholder="Select option"
              >
                {dressvalue.map((dr) => (
                  <option key={dr} value={dr}>
                    {dr}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Text mb="2px">sub category</Text>
              <Select
                onChange={(e) => setSub_category(e.target.value)}
                mb={4}
                placeholder="Select option"
              >
                {subvalues.map((sb) => (
                  <option key={sb} value={sb}>
                    {sb}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Text my="2px">details</Text>
          <Input
            mb={3}
            type="text"
            value={details}
            onChange={(e) => setdetails(e.target.value)}
          />

          {/* <Text mb='2px'>colors</Text>
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
                </div> */}

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

          <Button colorScheme="blue" mt={5} mr={3} onClick={AddProduct}>
            add product
          </Button>
        </div>
      )}
    </>
  );
};

export default AddProduct;
