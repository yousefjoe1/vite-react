import React, { useState } from "react";

import { Button, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../../_functions/getData";
import MySpinner from "../../../_components/MainLayout/MySpinner";
import Selections from "./Selections";

let allDress = ["casual", "formal", "party", "gym"];
let allSubCateg = ["men", "women", "shoes", "accessories"];
let allCategories = ["t-shirts", "shorts", "shirts", "hoodie", "jeans"];
let allColors = [
  "black",
  "gray",
  "white",
  "green",
  "blue",
  "olive",
  "navy" 
]
let allSizes = ["small", "medium", "large", "x-Large"]

const AddProduct = ({ refetch }: { refetch: Function }) => {
  let msg = useToast();
  const [submit, setsubmit] = useState(false);

  const [name, setName] = useState("");
  const [details, setdetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [sub_category, setSub_category] = useState("");
  const [dress, setDress] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newImages: string[] = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const addProduct = async () => {
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

    let res = await axios.post(`${baseUrl}/api/products`, d, h);
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
        <form onSubmit={addProduct} className="w-[700px] mx-auto border-2 shadow-sm rounded-2xl p-7 mb-5">
          <div className="grid gap-4 grid-cols-3">
            <div>
              <Text mb="2px">name</Text>
              <Input
                mb={3}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Text mb="2px">price</Text>
              <Input
                mb={3}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Text mb="2px">discount</Text>
              <Input
                mb={3}
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-3">
            <div>
              <Text mb="2px">category</Text>
              <Selections firstValue="t-shirts" values={allCategories} assignValue={(e:string)=> setCategory(e)} />
            </div>
            <div>
              <Text mb="2px">dress</Text>
              <Selections firstValue="casual" values={allDress} assignValue={(e:string)=> setDress(e)} />
            </div>

            <div>
              <Text mb="2px">sub category</Text>
              <Selections firstValue="men" values={allSubCateg} assignValue={(e:string)=> setSub_category(e)} />
            </div>

            <div>
              <Text mb="2px">Colors</Text>
              <Selections firstValue="black" values={allColors} assignValue={(e:string)=> setColors(p=> [...p,e])} />
            </div>

            <div>
              <Text mb="2px">Sizes</Text>
              <Selections firstValue="small" values={allSizes} assignValue={(e:string)=> setSizes(p=> [...p,e])} />
            </div>
          </div>

          <Text my="2px">details</Text>
          <Input
            mb={3}
            type="text"
            value={details}
            onChange={(e) => setdetails(e.target.value)}
            required
          />

          <Text my="2px">images</Text>
          <div className="flex flex-col gap-5">
            <Input
              type="text"
              value={images[0]}
              onChange={(e) => handleImageChange(0, e)}
              required
            />
            <Input
              type="text"
              value={images[1]}
              onChange={(e) => handleImageChange(1, e)}
              required
            />
            <Input
              type="text"
              value={images[2]}
              onChange={(e) => handleImageChange(2, e)}
              required
            />
          </div>

          <Input as={Button}
            colorScheme="blue"
            bg={'blue'}
            mt={5}
            mr={3}
            color={'white'}
            type="submit"
          >
            submit
            </Input>
        </form>
      )}
    </>
  );
};

export default AddProduct;
