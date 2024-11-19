import React, { FormEvent, useState } from "react";

import { Button, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../../../_functions/getData";
import MySpinner from "../../../_components/MySpinner";
import { allCategories, allColors, allDress, allSizes, allSubCateg } from "../../../_constants/AddProductsData";
import Selections from "../../../_components/Selections";
import MultiSelections from "../../../_components/MultiSelections";

const AddProduct = ({ refetch }: { refetch: Function }) => {
  let msg = useToast();
  const [submit, setsubmit] = useState(false);

  const [name, setName] = useState("");
  const [details, setdetails] = useState("");
  const [price, setPrice] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [category, setCategory] = useState("t-shirts");
  const [sub_category, setSub_category] = useState("men");
  const [dress, setDress] = useState("casual");
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

  const addProduct = async (e:FormEvent) => {
    e.preventDefault()
    setsubmit((p) => true);
    let h = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
      },
    };
    let d = {
      name: name,
      price: price == '0' ? 5 : price,
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
      msg({ title: "Product added.", status: "success", duration: 3000 });
      refetch();
    }
  };

  return (
    <>
      {/* {submit ? (
        <MySpinner />
      ) : ( */}
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
              <Selections firstValue={category} values={allCategories} assignValue={(e:string)=> setCategory(e)} />
            </div>
            <div>
              <Text mb="2px">dress style</Text>
              <Selections firstValue={dress} values={allDress} assignValue={(e:string)=> setDress(e)} />
            </div>

            <div>
              <Text mb="2px">sub category</Text>
              <Selections firstValue={sub_category} values={allSubCateg} assignValue={(e:string)=> setSub_category(e)} />
            </div>

            <div>
              <Text mb="2px">Colors</Text> 
              <MultiSelections values={allColors} assignValue={(v:string[])=> setColors(v)} />
            </div>

            <div>
              <Text mb="2px">Sizes</Text>
              <MultiSelections values={allSizes} assignValue={(v:string[])=> setSizes(v)} />
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
              // value={images[0]}
              onChange={(e) => handleImageChange(0, e)}
              // required
            />
            <Input
              type="text"
              // value={images[1]}
              onChange={(e) => handleImageChange(1, e)}
              // required
            />
            <Input
              type="text"
              // value={images[2]}
              onChange={(e) => handleImageChange(2, e)}
              // required
            />
          </div>

          <Input disabled={submit} as={Button}
            colorScheme="blue"
            bg={'blue'}
            mt={5}
            mr={3}
            color={'white'}
            type="submit"
          >
            submit
            {submit && <MySpinner s="sm" />}
            </Input>
        </form>
      {/* )} */}
    </>
  );
};

export default AddProduct;
